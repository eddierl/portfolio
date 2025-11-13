import { neon } from "@neondatabase/serverless";

export const sql = (() => {
  if (!process.env.DB_POSTGRES_URL) {
    throw new Error("Can't connect to db");
  }
  return neon(process.env.DB_POSTGRES_URL);
})();
