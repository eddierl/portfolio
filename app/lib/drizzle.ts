import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";

import { logsTable, poemsTable } from "app/lib/drizzle/schema";

const dbUrl = process.env.DB_POSTGRES_URL;

export const db = dbUrl ? drizzle(neon(dbUrl), { schema: { logsTable, poemsTable } }) : undefined;
export { sql };
