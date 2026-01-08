import { eq } from "drizzle-orm";
import { z } from "zod";
import { hashPassword, verifyPassword } from "@/infrastructure/crypto/password";
import { db } from "@/infrastructure/db";
import { adminAccount } from "@/infrastructure/db/schema";
import { adminProcedure, router } from "../context";

export const authRouter = router({
  changePassword: adminProcedure
    .input(
      z.object({
        currentPassword: z.string(),
        newPassword: z
          .string()
          .min(12, "パスワードは12文字以上で入力してください"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const [userAccount] = await db
        .select()
        .from(adminAccount)
        .where(eq(adminAccount.userId, userId))
        .limit(1);

      if (!userAccount || !userAccount.password) {
        throw new Error("アカウント情報が見つかりません");
      }

      const isValid = await verifyPassword(
        input.currentPassword,
        userAccount.password,
      );

      if (!isValid) {
        throw new Error("現在のパスワードが正しくありません");
      }

      const hashedPassword = await hashPassword(input.newPassword);

      await db
        .update(adminAccount)
        .set({ password: hashedPassword, updatedAt: new Date() })
        .where(eq(adminAccount.userId, userId));

      return { success: true, message: "パスワードを変更しました" };
    }),
});
