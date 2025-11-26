import { integer, jsonb, pgTable, varchar } from "drizzle-orm/pg-core";

export const logsTable = pgTable("logs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  path: varchar(),
  ua: varchar(),
  time: varchar(),
  geo: jsonb().$type<{ country: string }>(),
  clientId: varchar("client_id"),
  referrer: varchar(),
});
