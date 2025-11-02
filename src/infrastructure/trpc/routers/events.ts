import { z } from "zod";
import { EventType, PublicationStatus } from "@/domain/entities";
import { publicProcedure, router } from "../context";

const createEventSchema = z.object({
  id: z.string(),
  publicationStatus: z.enum([
    PublicationStatus.Draft,
    PublicationStatus.Published,
    PublicationStatus.Archived,
  ]),
  title: z.string(),
  date: z.string(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  type: z.enum([
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
  ]),
});

const updateEventSchema = z.object({
  publicationStatus: z
    .enum([
      PublicationStatus.Draft,
      PublicationStatus.Published,
      PublicationStatus.Archived,
    ])
    .optional(),
  title: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  type: z
    .enum([
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
    ])
    .optional(),
});

/**
 * イベント操作ルーター

 * ctx.eventService: コンテキストからService層を取得
 * input: フロントエンドから送られてくるデータ（Zodでバリデーション済み）
 */
export const eventsRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    return await ctx.eventService.getAllEvents();
  }),
  getById: publicProcedure
    .input(z.string()) // 入力は文字列（ID）
    .query(async ({ ctx, input }) => {
      return await ctx.eventService.getEventById(input);
    }),
  create: publicProcedure
    .input(createEventSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.eventService.createEvent(input);
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: updateEventSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.eventService.updateEvent(input.id, input.data);
    }),
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.eventService.deleteEvent(input);
  }),
});
