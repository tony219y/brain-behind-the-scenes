DO $$ BEGIN
 ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_message_id_Message_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."Message"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_post_type_id_PostType_id_fk" FOREIGN KEY ("post_type_id") REFERENCES "public"."PostType"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_post_tag_id_PostTag_id_fk" FOREIGN KEY ("post_tag_id") REFERENCES "public"."PostTag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
