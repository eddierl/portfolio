import * as Sentry from "@sentry/nextjs";
import { Redis } from "@upstash/redis";
import { desc } from "drizzle-orm";
import { db } from "@/app/lib/drizzle";
import { poemsTable } from "@/app/lib/drizzle/schema";

// Initialize Redis
const redis = Redis.fromEnv();

type Poem = {
  id?: number;
  content?: string;
  generatedAt?: number;
};

export async function getLatestPoem(): Promise<Poem | null> {
  try {
    const cachedResult = (await redis.get("poem")) satisfies Poem | null;

    if (cachedResult) return cachedResult;

    const result = await db
      ?.select()
      .from(poemsTable)
      .orderBy(desc(poemsTable.generatedAt))
      .limit(1);

    const poem = result ?? [];
    if (poem.length === 0) return null;

    const data = {
      id: poem[0]?.id,
      content: poem[0]?.content,
      generatedAt: poem[0]?.generatedAt,
    };

    // Cache for 24 hours; fire-and-forget since a failed write
    // only means the next request re-reads from the DB.
    await redis.set("poem", data, { ex: 60 * 60 * 24 }).catch(() => {});

    return data;
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
}
