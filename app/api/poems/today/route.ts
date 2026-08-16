import { db } from "app/lib/drizzle";
import { poemsTable } from "app/lib/drizzle/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  try {
    const poem = await db
      .select()
      .from(poemsTable)
      .orderBy(desc(poemsTable.generatedAt))
      .limit(1);

    if (poem.length === 0) {
      return NextResponse.json(
        { error: "No poem found. Generate one first." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      id: poem[0]!.id,
      content: poem[0]!.content,
      generatedAt: poem[0]!.generatedAt,
    });
  } catch (error) {
    console.error("Failed to fetch poem:", error);
    return NextResponse.json(
      { error: "Failed to fetch poem" },
      { status: 500 },
    );
  }
}
