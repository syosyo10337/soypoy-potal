import { z } from "zod";
import { publicProcedure, router } from "../context";
import { createEventSchema, updateEventSchema } from "../schemas/eventSchema";

export { type EventFormData, eventFormSchema } from "../schemas/eventSchema";

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
