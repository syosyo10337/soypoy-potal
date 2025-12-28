import { scryptAsync } from "@noble/hashes/scrypt.js";
import { bytesToHex, randomBytes } from "@noble/hashes/utils.js";
import { eq, or } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { AdminUserRole } from "@/domain/entities";
import { db } from "@/infrastructure/db";
import {
  adminAccount,
  adminSession,
  adminUser,
} from "@/infrastructure/db/schema";
import { adminProcedure, router, superAdminProcedure } from "../context";

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

function generateTempPassword(): string {
  const words = ["Soypoy", "Admin", "Reset"];
  const word = words[Math.floor(Math.random() * words.length)];
  const year = new Date().getFullYear();
  const random = nanoid(6);
  return `${word}-${year}-${random}`;
}

const adminRoles = [AdminUserRole.Admin, AdminUserRole.SuperAdmin] as const;

const createAdminSchema = z.object({
  email: z.email(),
  password: z.string().min(12),
  name: z.string().min(1),
  role: z.enum(adminRoles),
});

const updateAdminSchema = z.object({
  id: z.string(),
  data: z.object({
    name: z.string().min(1).optional(),
    email: z.email().optional(),
    role: z.enum(adminRoles).optional(),
  }),
});
// TODO: serviceへロジックを移行。dbでの操作はrepositoryで行う
export const adminsRouter = router({
  list: adminProcedure.query(async () => {
    const admins = await db
      .select({
        id: adminUser.id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
        createdAt: adminUser.createdAt,
        updatedAt: adminUser.updatedAt,
      })
      .from(adminUser)
      .where(
        or(
          eq(adminUser.role, AdminUserRole.Admin),
          eq(adminUser.role, AdminUserRole.SuperAdmin),
        ),
      );

    return admins;
  }),

  getById: adminProcedure.input(z.string()).query(async ({ input }) => {
    const [admin] = await db
      .select({
        id: adminUser.id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
        createdAt: adminUser.createdAt,
        updatedAt: adminUser.updatedAt,
      })
      .from(adminUser)
      .where(eq(adminUser.id, input))
      .limit(1);

    return admin ?? null;
  }),

  create: superAdminProcedure
    .input(createAdminSchema)
    .mutation(async ({ input }) => {
      const existingUser = await db
        .select()
        .from(adminUser)
        .where(eq(adminUser.email, input.email))
        .limit(1);

      if (existingUser.length > 0) {
        throw new Error("このメールアドレスは既に使用されています");
      }

      const userId = nanoid();
      const accountId = nanoid();
      const hashedPassword = await hashPassword(input.password);
      const now = new Date();

      await db.insert(adminUser).values({
        id: userId,
        email: input.email,
        name: input.name,
        emailVerified: true,
        role: input.role,
        createdAt: now,
        updatedAt: now,
      });

      await db.insert(adminAccount).values({
        id: accountId,
        accountId: userId,
        providerId: "credential",
        userId: userId,
        password: hashedPassword,
        createdAt: now,
        updatedAt: now,
      });

      return {
        id: userId,
        email: input.email,
        name: input.name,
        role: input.role,
      };
    }),

  update: superAdminProcedure
    .input(updateAdminSchema)
    .mutation(async ({ input }) => {
      const { id, data } = input;

      if (data.email) {
        const existingUser = await db
          .select()
          .from(adminUser)
          .where(eq(adminUser.email, data.email))
          .limit(1);

        if (existingUser.length > 0 && existingUser[0].id !== id) {
          throw new Error("このメールアドレスは既に使用されています");
        }
      }

      const updateData: Record<string, unknown> = {
        updatedAt: new Date(),
      };

      if (data.name) updateData.name = data.name;
      if (data.email) updateData.email = data.email;
      if (data.role) updateData.role = data.role;

      await db.update(adminUser).set(updateData).where(eq(adminUser.id, id));

      const [updatedAdmin] = await db
        .select({
          id: adminUser.id,
          name: adminUser.name,
          email: adminUser.email,
          role: adminUser.role,
        })
        .from(adminUser)
        .where(eq(adminUser.id, id))
        .limit(1);

      return updatedAdmin;
    }),

  delete: superAdminProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.id === input) {
        throw new Error("自分自身を削除することはできません");
      }

      await db.delete(adminUser).where(eq(adminUser.id, input));

      return { success: true };
    }),

  resetPassword: superAdminProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.id === input.userId) {
        throw new Error(
          "自分自身のパスワードはリセットできません。パスワード変更画面をご利用ください。",
        );
      }

      const tempPassword = generateTempPassword();
      const hashedPassword = await hashPassword(tempPassword);

      await db
        .update(adminAccount)
        .set({ password: hashedPassword, updatedAt: new Date() })
        .where(eq(adminAccount.userId, input.userId));

      await db
        .delete(adminSession)
        .where(eq(adminSession.userId, input.userId));

      return {
        tempPassword,
        message:
          "パスワードをリセットしました。この一時パスワードをユーザーに伝えてください。",
      };
    }),
});
