CREATE TYPE "public"."event_type" AS ENUM('art', 'comedy', 'dance', 'design', 'impro', 'impro_kanji', 'movie', 'music', 'photo', 'talk', 'theater', 'workshop', 'other');--> statement-breakpoint
CREATE TYPE "public"."publication_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TABLE "events" (
	"id" text PRIMARY KEY NOT NULL,
	"publicationStatus" "publication_status" NOT NULL,
	"title" varchar(255) NOT NULL,
	"date" varchar(255) NOT NULL,
	"description" text,
	"thumbnail" text,
	"type" "event_type" NOT NULL
);
