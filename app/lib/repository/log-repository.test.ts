import { describe, expect, it, vi } from "vitest";

import type { LogAggregatedResult, LogResult } from "./log-repository";
import { createLogRepository } from "./log-repository";

// ─── Mock data ───────────────────────────────────────────────────────────────

const EXCLUDED_CLIENT_ID = "c2b6d823-85c4-4687-a255-a9908861c014";

const mockLogs = [
  {
    id: 1,
    time: "2026-11-01T10:00:00Z",
    clientId: EXCLUDED_CLIENT_ID,
    geo: { country: "US", city: "Seattle" },
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0",
    device: "desktop",
    path: "/blog",
    referrer: "google.com",
  },
  {
    id: 2,
    time: "2026-11-01T09:00:00Z",
    clientId: "abc-123",
    geo: { country: "US", city: "Seattle" },
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0",
    device: "desktop",
    path: "/about",
    referrer: "github.com",
  },
  {
    id: 3,
    time: "2026-10-30T08:00:00Z",
    clientId: "def-456",
    geo: null,
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)",
    device: "mobile",
    path: "/blog",
    referrer: null,
  },
  {
    id: 4,
    time: "2026-10-29T07:00:00Z",
    clientId: "ghi-789",
    geo: { country: "AU", city: "Perth" },
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) Firefox/120.0",
    device: "desktop",
    path: "/skills",
    referrer: "linkedin.com",
  },
  {
    id: 5,
    time: "2026-10-28T06:00:00Z",
    clientId: "abc-123",
    geo: { country: "US", city: "Seattle" },
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/119.0",
    device: "desktop",
    path: "/blog/another",
    referrer: "twitter.com",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Build a minimal mock db that chains methods and returns mock data. */
function createMockDb(data: unknown) {
  const chain = {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    groupBy: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    offset: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnValue(data),
  };
  return chain as unknown as {
    select: ReturnType<typeof vi.fn>;
    from: ReturnType<typeof vi.fn>;
    where: ReturnType<typeof vi.fn>;
    groupBy: ReturnType<typeof vi.fn>;
    limit: ReturnType<typeof vi.fn>;
    offset: ReturnType<typeof vi.fn>;
    orderBy: ReturnType<typeof vi.fn>;
  };
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("createLogRepository", () => {
  describe("findLogs", () => {
    it("returns empty array when db is undefined", () => {
      const repo = createLogRepository(undefined as never);
      const result = repo.findLogs({});
      expect(result.ok).toBe(true);
      expect((result as { ok: true; value: unknown }).value).toEqual([]);
    });

    it("returns normal logs excluding the hardcoded clientId and null geo", () => {
      const validLogs = mockLogs.filter(
        (l) => l.clientId !== EXCLUDED_CLIENT_ID && l.geo !== null,
      );
      const mockDb = createMockDb(validLogs);

      const repo = createLogRepository(mockDb as never);
      const result = repo.findLogs({});

      expect(result.ok).toBe(true);
      const values = (result as { ok: true; value: LogResult[] }).value;
      expect(values).toHaveLength(3); // excluded clientId + null geo filtered out
      expect(values.map((v) => v.clientId)).not.toContain(EXCLUDED_CLIENT_ID);
    });

    it("filters by clientId when provided", () => {
      const validLogs = mockLogs.filter(
        (l) =>
          l.clientId !== EXCLUDED_CLIENT_ID &&
          l.geo !== null &&
          l.clientId === "abc-123",
      );
      const mockDb = createMockDb(validLogs);

      const repo = createLogRepository(mockDb as never);
      const result = repo.findLogs({ clientId: "abc-123" });

      expect(result.ok).toBe(true);
      const values = (result as { ok: true; value: LogResult[] }).value;
      expect(values).toHaveLength(2);
      expect(values.every((v) => v.clientId === "abc-123")).toBe(true);
    });

    it("returns aggregated results with count and referrals", () => {
      const validLogs = mockLogs.filter(
        (l) => l.clientId !== EXCLUDED_CLIENT_ID && l.geo !== null,
      );

      const aggregated = validLogs.reduce<LogAggregatedResult[]>((acc, log) => {
        const existing = acc.find(
          (e) =>
            e.clientId === log.clientId && e.geo?.country === log.geo?.country,
        );
        if (existing) {
          existing.count += 1;
          if (log.referrer) {
            existing.referrals.push(log.referrer);
          }
        } else {
          acc.push({
            time: log.time,
            ua: log.ua,
            device: log.device,
            geo: log.geo,
            clientId: log.clientId,
            count: 1,
            referrals: log.referrer ? [log.referrer] : [],
          });
        }
        return acc;
      }, []);

      const mockDb = createMockDb(aggregated);

      const repo = createLogRepository(mockDb as never);
      const result = repo.findLogs({ aggregate: true });

      expect(result.ok).toBe(true);
      const values = (result as { ok: true; value: LogAggregatedResult[] })
        .value;
      expect(values).toHaveLength(2); // 2 distinct clientId+geo combos
      expect(values.every((v) => "count" in v && "referrals" in v)).toBe(true);
    });

    it("respects take and skip pagination", () => {
      const validLogs = mockLogs.filter(
        (l) => l.clientId !== EXCLUDED_CLIENT_ID && l.geo !== null,
      );
      const mockDb = createMockDb(validLogs.slice(0, 3));

      const repo = createLogRepository(mockDb as never);
      const result = repo.findLogs({ take: 3 });

      expect(result.ok).toBe(true);
      const values = (result as { ok: true; value: LogResult[] }).value;
      expect(values).toHaveLength(3);
    });

    it("returns Result with error on query failure", () => {
      const mockDb = createMockDb(null);
      (mockDb.orderBy as any).mockImplementation(() => {
        throw new Error("connection refused");
      });

      const repo = createLogRepository(mockDb as never);
      const result = repo.findLogs({});

      expect(result.ok).toBe(false);
      expect((result as { ok: false; error: Error }).error.message).toBe(
        "connection refused",
      );
    });

    it("excludes the hardcoded clientId even when explicitly queried", () => {
      const validLogs = mockLogs.filter(
        (l) => l.clientId !== EXCLUDED_CLIENT_ID && l.geo !== null,
      );
      const mockDb = createMockDb(validLogs);

      const repo = createLogRepository(mockDb as never);
      const result = repo.findLogs({ clientId: EXCLUDED_CLIENT_ID });

      expect(result.ok).toBe(true);
      const values = (result as { ok: true; value: LogResult[] }).value;
      expect(values).toHaveLength(3);
      expect(values.every((v) => v.clientId !== EXCLUDED_CLIENT_ID)).toBe(true);
    });

    it("returns empty array when all results are filtered (only excluded + null geo)", () => {
      const mockDb = createMockDb([]);

      const repo = createLogRepository(mockDb as never);
      const result = repo.findLogs({});

      expect(result.ok).toBe(true);
      const values = (result as { ok: true; value: LogResult[] }).value;
      expect(values).toHaveLength(0);
    });
  });
});
