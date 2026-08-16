import { integer, jsonb, pgTable, varchar, text } from "drizzle-orm/pg-core";

export const logsTable = pgTable("logs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  path: varchar(),
  ua: varchar(),
  time: varchar(),
  geo: jsonb().$type<{ country: string }>(),
  clientId: varchar("client_id"),
  referrer: varchar(),
});

export const poemsTable = pgTable("poems", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  content: text().notNull(),
  generatedAt: integer("generated_at", { mode: "number" }).notNull(),
});
