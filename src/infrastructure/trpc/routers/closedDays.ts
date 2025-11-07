import { z } from "zod";
import { publicProcedure, router } from "../context";

/**
 * 休業日操作ルーター
 */
export const closedDaysRouter = router({
  listByMonth: publicProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.closedDayService.getClosedDaysByMonth(
        input.year,
        input.month,
      );
    }),
});
