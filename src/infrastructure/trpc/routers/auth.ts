import { changePasswordSchema } from "@/domain/validation";
import { adminProcedure, router } from "../context";

/**
 * 認証操作ルーター
 *
 * ctx.adminService: コンテキストからService層を取得
 * すべてのビジネスロジックはAdminServiceに委譲
 */
export const authRouter = router({
  changePassword: adminProcedure
    .input(changePasswordSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.adminService.changePassword(ctx.session.user.id, input);
    }),
});
