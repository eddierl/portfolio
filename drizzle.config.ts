import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import { defineConfig } from "drizzle-kit";

const dbUrl = process.env.DB_POSTGRES_URL;
if (!dbUrl) {
  throw new Error("DB_POSTGRES_URL environment variable is not set");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./app/lib/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
});
