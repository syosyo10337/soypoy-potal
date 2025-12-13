ALTER TABLE "closed_days"
  ALTER COLUMN "date" SET DATA TYPE timestamp
  USING date::timestamp;--> statement-breakpoint

ALTER TABLE "events"
  ALTER COLUMN "date" SET DATA TYPE timestamp
  USING date::timestamp;
