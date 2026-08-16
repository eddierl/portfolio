CREATE TABLE "logs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "logs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"path" varchar,
	"ua" varchar,
	"time" varchar,
	"geo" jsonb,
	"client_id" varchar,
	"referrer" varchar
);
--> statement-breakpoint
CREATE TABLE "poems" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "poems_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"content" text NOT NULL,
	"generated_at" integer NOT NULL
);
