import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Right now just log to console (shows up in Vercel/Netlify logs)
  console.log("📜 Middleware log:", body);

  // You could also save to a DB (e.g. Supabase, Planetscale, SQLite, etc.)
  return NextResponse.json({ ok: true });
}
