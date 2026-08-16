import { db } from "app/lib/drizzle";
import { poemsTable } from "app/lib/drizzle/schema";
import { NextResponse } from "next/server";

const GEMINI_MODEL = "gemini-3.5-flash";

async function generatePoemWithGemini(): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set.");
  }

  const prompt = `Write an original, rhyming poem (2-3 short stanzas, 3-4 lines each) based on this developer's CV. The poem should read like a personal, confident pitch — technical but approachable, not pretentious.

Style rules:
- Each stanza should be a self-contained "block" of 3-4 short lines
- Use end rhymes (AABB or ABAB per stanza is fine)
- Reference specific tech, tools, or achievements from the CV — name-drop languages, frameworks, metrics, or notable projects
- Keep it grounded and real, like something you'd say at a conference or put on a portfolio
- No titles, no fluff, no abstract metaphors about time or nature
- Return ONLY the poem text, nothing else.

Developer CV:
Eddie Erlich — Senior Software Engineer, 10+ years
Tech: TypeScript, React, Next.js, Node.js, React Native, AWS, GCP, GraphQL, Postgres, MongoDB, Playwright, Jest, Tailwind, Zod, Remix, NX, Turborepo
Notable: Migrated AngularJS to React at Wix (1M+ users), built solar financing platform reducing lead-to-offer from 4 days to minutes, React Native app serving 7 US states with 35% engagement boost, migrated Cypress to Playwright (30% E2E speedup), 40% reduction in critical bugs via testing strategy at Autodesk, monorepo with NX at Venn. Full working rights in Australia.
Make it sound like Eddie wrote it himself — confident, practical, with a touch of dry humor.

Good example:
\`\`\`
TypeScript on the front
Node.js on the back
Enough testing
to sleep at 10pm.

10 years of delivering
things that actually work.

I've built products for startups
and teams that move fast.
I listen well, learn deep
and won't ship anything half-baked.\`\`\`

Bad example:
\`\`\`
I'm Eddie, ten years deep in React, AWS, and Node,
Writing clean migrations and production-ready code.
I moved a million Wix users off of AngularJS,
And cut solar
\`\`\`
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 4096,
        },
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${error}`);
  }

  const data = await response.json();

  // Handle both old (generateContent) and new (Interactions API) response formats
  const candidate = data.candidates?.[0] ?? data.response?.candidates?.[0];

  if (!candidate) {
    throw new Error("Gemini returned no candidates.");
  }

  const text = candidate.content?.parts?.[0]?.text ?? candidate.output;

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
      ?.insert(poemsTable)
      .values({ content, generatedAt: now })
      .returning();

    const poem = result?.[0];
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
