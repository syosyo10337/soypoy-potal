import { z } from "zod";
import { AdminUserRole } from "@/domain/entities";

/**
 * 管理者バリデーションスキーマ（Domain層）
 *
 * このスキーマはビジネスルール（ドメイン制約）を表現しています：
 * - メールアドレスは有効な形式
 * - パスワードは12文字以上
 * - 名前は必須
 * - ロールは定義された値のみ
 *
 * UI層（フォーム）とAPI層（tRPC）の両方で使用されます。
 */

const adminRoles = [AdminUserRole.Admin, AdminUserRole.SuperAdmin] as const;

/**
 * 管理者作成用スキーマ（UI/API共通）
 * ユーザーが入力するデータ
 */
export const createAdminSchema = z.object({
  email: z.email({ message: "有効なメールアドレスを入力してください" }),
  password: z
    .string()
    .min(12, { message: "パスワードは12文字以上で入力してください" }),
  name: z.string().min(1, { message: "名前は必須です" }),
  role: z.enum(adminRoles, { message: "ロールを選択してください" }),
});

/**
 * 管理者更新用スキーマ（UI/API共通）
 * 部分更新に対応：変更したいフィールドのみ送信可能
 */
export const updateAdminSchema = z.object({
  name: z.string().min(1, { message: "名前は必須です" }).optional(),
  email: z
    .email({ message: "有効なメールアドレスを入力してください" })
    .optional(),
  role: z.enum(adminRoles, { message: "ロールを選択してください" }).optional(),
});

/**
 * パスワード変更用スキーマ
 */
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: "現在のパスワードを入力してください" }),
  newPassword: z
    .string()
    .min(12, { message: "パスワードは12文字以上で入力してください" }),
});

/**
 * パスワードリセット用スキーマ
 */
export const resetPasswordSchema = z.object({
  userId: z.string(),
});

// 型エクスポート（Service層・API層で使用）
export type CreateAdminInput = z.infer<typeof createAdminSchema>;
export type UpdateAdminInput = z.infer<typeof updateAdminSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
