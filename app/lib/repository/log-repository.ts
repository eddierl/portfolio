import {
  and,
  count,
  desc,
  eq,
  getTableColumns,
  max,
  ne,
  sql,
} from "drizzle-orm";

import { logsTable } from "@/app/lib/drizzle/schema";

// ─── Result type (defined here, not extracted — only one consumer) ────────────

type Result<T> = { ok: true; value: T } | { ok: false; error: Error };

// ─── Domain types (part of the repository's interface) ────────────────────────

export interface LogQueryParams {
  take?: number;
  skip?: number;
  clientId?: string | null;
  aggregate?: boolean;
}

export interface LogResult {
  time: string;
  ua: string;
  device: string;
  geo: {
    city?: string;
    country?: string;
    flag?: string;
    countryRegion?: string;
    region?: string;
    latitude?: string;
    longitude?: string;
    postalCode?: string;
  } | null;
  clientId: string;
  path?: string;
  referrer?: string | null;
}

export interface LogAggregatedResult {
  time: string;
  ua: string;
  device: string;
  geo: {
    city?: string;
    country?: string;
    flag?: string;
    countryRegion?: string;
    region?: string;
    latitude?: string;
    longitude?: string;
    postalCode?: string;
  } | null;
  clientId: string;
  count: number;
  referrals: string[];
}

// ─── Constants (business rule, not a caller concern) ──────────────────────────

const EXCLUDED_CLIENT_ID = "c2b6d823-85c4-4687-a255-a9908861c014";

// ─── Repository module ───────────────────────────────────────────────────────

/**
 * A deep module: a small interface (one method) behind complex query logic.
 *
 * The repository accepts `db` as a dependency (accept dependencies, don't
 * create them) so callers can pass a mock during tests.
 *
 * @param db — Neon HTTP client (may be undefined in dev).
 * @returns An object with `findLogs`, the sole method of this module.
 */
export function createLogRepository(db: typeof import("app/lib/drizzle").db) {
  return {
    /**
     * Query logs with optional aggregation.
     *
     * - Normal query (aggregate: false / undefined): returns flat log entries.
     * - Aggregated query (aggregate: true): returns grouped entries with
     *   `count` and `referrals` fields.
     *
     * Always excludes the hardcoded client ID and filters out entries with
     * null country in geo.
     *
     * @param params — Query parameters.
     * @returns Result wrapping the query results.
     */
    findLogs(
      params: LogQueryParams,
    ): Result<LogResult[] | LogAggregatedResult[]> {
      const {
        take = 10,
        skip = 0,
        clientId = null,
        aggregate = false,
      } = params;

      // If db is undefined (no DB URL in dev), return empty arrays silently.
      if (!db) {
        return { ok: true, value: [] as LogResult[] | LogAggregatedResult[] };
      }

      try {
        const columns = getTableColumns(logsTable);

        if (aggregate) {
          // Aggregated query: group by clientId, geo, ua; count + array_agg referrers.
          const logs = db
            .select({
              clientId: columns.clientId,
              geo: columns.geo,
              ua: columns.ua,
              count: count(logsTable.id),
              time: max(logsTable.time),
              referrals: sql<string[]>`array_agg(${logsTable.referrer})`,
            })
            .from(logsTable)
            .where(
              and(
                ne(logsTable.clientId, EXCLUDED_CLIENT_ID),
                sql`${logsTable.geo}->>'country' is not null`,
              ),
            )
            .groupBy(logsTable.clientId, logsTable.geo, logsTable.ua)
            .limit(take)
            .offset(skip)
            .orderBy(desc(max(logsTable.time)));

          return { ok: true, value: logs as unknown as LogAggregatedResult[] };
        }

        // Normal query: select all columns.
        const logs = db
          .select(columns)
          .from(logsTable)
          .where(
            and(
              ne(logsTable.clientId, EXCLUDED_CLIENT_ID),
              sql`${logsTable.geo}->>'country' is not null`,
              ...(clientId ? [eq(logsTable.clientId, clientId)] : []),
            ),
          )
          .limit(take)
          .offset(skip)
          .orderBy(desc(logsTable.time));

        return { ok: true, value: logs as unknown as LogResult[] };
      } catch (error) {
        return {
          ok: false,
          error: error instanceof Error ? error : new Error(String(error)),
        };
      }
    },
  };
}
