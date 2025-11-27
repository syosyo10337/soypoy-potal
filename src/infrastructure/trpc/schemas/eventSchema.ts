import { z } from "zod";
import { EventType, PublicationStatus } from "@/domain/entities";

const publicationStatusValues = [
  PublicationStatus.Draft,
  PublicationStatus.Published,
  PublicationStatus.Archived,
] as const;

const eventTypeValues = [
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
] as const;

// TODO: Schemaが過剰じゃないか確認する
export const eventSchema = z.object({
  id: z.string(),
  publicationStatus: z.enum(publicationStatusValues),
  title: z.string().min(1, "タイトルは必須です"),
  date: z.string().min(1, "日付は必須です"),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  type: z.enum(eventTypeValues),
});

export const createEventSchema = eventSchema.omit({
  id: true,
  publicationStatus: true,
});
export const updateEventSchema = eventSchema.omit({
  id: true,
});

export type CreateEventData = z.infer<typeof createEventSchema>;
export type UpdateEventData = z.infer<typeof updateEventSchema>;
