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
export const createEventSchema = z.object({
  id: z.string(),
  publicationStatus: z.enum(publicationStatusValues),
  title: z.string(),
  date: z.string(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  type: z.enum(eventTypeValues),
});

export const eventFormSchema = createEventSchema.omit({ id: true }).extend({
  publicationStatus: z.enum(publicationStatusValues).optional(),
  title: z.string().min(1, "タイトルは必須です"),
  date: z.string().min(1, "日付は必須です"),
  type: z.enum(eventTypeValues),
});

export const updateEventSchema = z.object({
  publicationStatus: z.enum(publicationStatusValues).optional(),
  title: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  type: z.enum(eventTypeValues).optional(),
});

export type EventFormData = z.infer<typeof eventFormSchema>;
