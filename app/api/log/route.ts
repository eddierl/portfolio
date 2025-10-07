import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();

  const { error } = await supabase.from("logs").insert({
    path: body.path,
    ua: body.ua,
    geo: body.geo,
    time: body.time, // already ISO, Supabase will cast
    client_id: body.clientId,
  });

  if (error) {
    console.error("❌ Failed to insert log:", error.message);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 },
    );
  }
  // Right now just log to console (shows up in Vercel/Netlify logs)
  console.log("📜 Middleware log:", body);

  // You could also save to a DB (e.g. Supabase, Planetscale, SQLite, etc.)
  return NextResponse.json({ ok: true });
}
