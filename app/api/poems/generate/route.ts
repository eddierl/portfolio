import { db } from "app/lib/drizzle";
import { poemsTable } from "app/lib/drizzle/schema";
import { NextResponse } from "next/server";

const GEMINI_MODEL = "gemini-2.0-flash";

async function generatePoemWithGemini(): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set.");
  }

  const prompt = `Write an original, evocative poem (3-5 stanzas, 4-6 lines each). It should be about the passage of time, memory, or the quiet beauty of everyday life. Make it feel personal and poetic, not generic. Do not include a title. Return only the poem text.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 1024,
        },
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned no poem text.");
  }

  return text.trim();
}

export async function POST() {
  try {
    const content = await generatePoemWithGemini();
    const now = Math.floor(Date.now() / 1000);

    const result = await db
      .insert(poemsTable)
      .values({ content, generatedAt: now })
      .returning();

    const poem = result[0];
    if (!poem) {
      return NextResponse.json(
        { error: "Failed to save poem" },
        { status: 500 },
      );
    }

    return NextResponse.json({ id: poem.id, generatedAt: poem.generatedAt });
  } catch (error) {
    console.error("Failed to generate poem:", error);
    return NextResponse.json(
      { error: "Failed to generate poem" },
      { status: 500 },
    );
  }
}
