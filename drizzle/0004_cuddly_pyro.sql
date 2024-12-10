CREATE TABLE IF NOT EXISTS "Portfolio" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"title" varchar(255),
	"content" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"is_visible" boolean DEFAULT true
);
--> statement-breakpoint
ALTER TABLE "Attachment" ADD COLUMN "portfolio_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_portfolio_id_Portfolio_id_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."Portfolio"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
