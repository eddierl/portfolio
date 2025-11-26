import { sql } from "app/lib/neon";
import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle({ client: sql });
