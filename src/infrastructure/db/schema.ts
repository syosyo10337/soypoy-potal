import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { EventType, PublicationStatus } from "@/domain/entities";

export const eventTypeEnum = pgEnum("event_type", [
  EventType.Art,
  EventType.Comedy,
  EventType.Dance,
  EventType.Design,
  EventType.Impro,
  EventType.Impro_Kanji,
  EventType.Movie,
  EventType.Music,
  EventType.Photo,
  EventType.Talk,
  EventType.Theater,
  EventType.Workshop,
  EventType.Other,
]);

export const publicationStatusEnum = pgEnum("publication_status", [
  PublicationStatus.Draft,
  PublicationStatus.Published,
  PublicationStatus.Archived,
]);

export const events = pgTable("events", {
  id: text().primaryKey(),
  publicationStatus: publicationStatusEnum().notNull(),
  title: varchar({ length: 255 }).notNull(),
  date: varchar({ length: 255 }).notNull(),
  description: text(),
  thumbnail: text(),
  type: eventTypeEnum().notNull(),
});

export type DrizzleEvent = InferSelectModel<typeof events>;
export type DrizzleEventInsert = InferInsertModel<typeof events>;
