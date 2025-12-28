import { scryptAsync } from "@noble/hashes/scrypt.js";
import { bytesToHex, randomBytes } from "@noble/hashes/utils.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/infrastructure/db";
import { adminAccount } from "@/infrastructure/db/schema";
import { adminProcedure, router } from "../context";

const scryptConfig = {
  N: 16384,
  r: 16,
  p: 1,
  dkLen: 64,
};

async function hashPassword(password: string): Promise<string> {
  const salt = bytesToHex(randomBytes(16));
  const key = await scryptAsync(password.normalize("NFKC"), salt, {
    N: scryptConfig.N,
    p: scryptConfig.p,
    r: scryptConfig.r,
    dkLen: scryptConfig.dkLen,
    maxmem: 128 * scryptConfig.N * scryptConfig.r * 2,
  });
  return `${salt}:${bytesToHex(key)}`;
}

async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;

  const key = await scryptAsync(password.normalize("NFKC"), salt, {
    N: scryptConfig.N,
    p: scryptConfig.p,
    r: scryptConfig.r,
    dkLen: scryptConfig.dkLen,
    maxmem: 128 * scryptConfig.N * scryptConfig.r * 2,
  });

  return bytesToHex(key) === hash;
}

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
