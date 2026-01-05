import Groq from "groq-sdk";
import { type NextRequest, NextResponse } from "next/server";

const groq = new Groq({
  apiKey:
    process.env.GROQ_API_KEY ||
    "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",
});
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    return new Response(challenge || "", { status: 200 });
  }
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function POST(req: NextRequest) {
  console.log("POST received"); // Check Vercel logs
  const body = await req.json(); // Raw for WhatsApp

  const reply = await processJSON(body);

  console.log(reply);
  return NextResponse.json({ received: true });
}

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

const getMessage = (s: S) => {
  switch (s.object) {
    case "whatsapp_business_account":
      return s.entry[0]?.changes[0]?.value.messages[0]?.text.body;
    default:
      return "Unknown";
  }
};

const processJSON = async (s: S) => {
  const message = getMessage(s);
  if (!message) throw new Error(`Failed to get message ${JSON.stringify(s)}`);

  const result = await groq.chat.completions.create({
    messages: [
      { role: "system", content: "Here is a list of groceries to buy." },
      { role: "system", content: message },
    ],
    model: "llama-3.1-8b-instant",
  });

  return { message, result };
};

type S = typeof ss;

const ss = {
  object: "whatsapp_business_account",
  entry: [
    {
      id: "1388812032892771",
      changes: [
        {
          value: {
            messaging_product: "whatsapp",
            metadata: {
              display_phone_number: "15551824971",
              phone_number_id: "891816554022998",
            },
            contacts: [{ profile: { name: "Eddie" }, wa_id: "972528078020" }],
            messages: [
              {
                from: "972528078020",
                id: "wamid.HBgMOTcyNTI4MDc4MDIwFQIAEhgUM0E0M0RFOUE1ODY5RTc2MkYxNzIA",
                timestamp: "1767598128",
                text: {
                  body: "\u05e7\u05de\u05d7 \u05dc\u05d1\u05df, \u05e1\u05d5\u05db\u05e8 \u05dc\u05d1\u05df \u05db\u05dc \u05d0\u05d7\u05d3 \u05dc\u05e4\u05d7\u05d5\u05ea 2 \u05e7\u05d9\u05dc\u05d5, \u05db\u05de\u05d4 \u05de\u05dc\u05e4\u05e4\u05d5\u05e0\u05d9\u05dd, \u05e2\u05d2\u05d1\u05e0\u05d9\u05d5\u05ea \u05e9\u05e8\u05d9, \u05d0\u05d1\u05d5\u05e7\u05d3\u05d5",
                },
                type: "text",
              },
            ],
          },
          field: "messages",
        },
      ],
    },
  ],
};
