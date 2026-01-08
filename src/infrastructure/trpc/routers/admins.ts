import { z } from "zod";
import {
  createAdminSchema,
  resetPasswordSchema,
  updateAdminSchema,
} from "@/domain/validation";
import { adminProcedure, router, superAdminProcedure } from "../context";

/**
 * 管理者操作ルーター
 *
 * ctx.adminService: コンテキストからService層を取得
 * すべてのビジネスロジックはAdminServiceに委譲
 */
export const adminsRouter = router({
  list: adminProcedure.query(async ({ ctx }) => {
    return await ctx.adminService.getAllAdmins();
  }),

  getById: adminProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.adminService.getAdminById(input);
  }),

  create: superAdminProcedure
    .input(createAdminSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.adminService.createAdmin(input);
    }),

  update: superAdminProcedure
    .input(
      z.object({
        id: z.string(),
        data: updateAdminSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.adminService.updateAdmin(input.id, input.data);
    }),

  delete: superAdminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.adminService.deleteAdmin(input, ctx.session.user.id);
      return { success: true };
    }),

  resetPassword: superAdminProcedure
    .input(resetPasswordSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.adminService.resetPassword(
        input.userId,
        ctx.session.user.id,
      );
    }),
});
