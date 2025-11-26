import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./app/lib/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_DATABASE_URL!,
  },
});
