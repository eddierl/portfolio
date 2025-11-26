import { db } from "app/lib/drizzle";
import { logsTable } from "app/lib/drizzle/schema";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();

  try {
    await db?.insert(logsTable).values(body);
    // Right now just log to console (shows up in Vercel/Netlify logs)
    console.log("📜 Middleware log:", body);

    // You could also save to a DB (e.g. Supabase, Planetscale, SQLite, etc.)
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : String(error);
    console.error("❌ Failed to insert log:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
