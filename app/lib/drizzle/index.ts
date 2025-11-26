import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export const db = await (async () => {
  if (!process.env.DB_DATABASE_URL) return;
  const sql = neon(process.env.DB_DATABASE_URL);
  const db = drizzle({ client: sql });
  return db;
})();
