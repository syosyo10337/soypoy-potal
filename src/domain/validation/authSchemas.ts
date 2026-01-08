import { z } from "zod";

/**
 * 認証バリデーションスキーマ（Domain層）
 *
 * このスキーマはビジネスルール（ドメイン制約）を表現しています：
 * - メールアドレスは必須かつ有効な形式
 * - パスワードは必須
 *
 * UI層（ログインフォーム）で使用されます。
 */

export const loginFormSchema = z.object({
  email: z.email({ message: "有効なメールアドレスを入力してください" }),
  password: z.string({ message: "パスワードを入力してください" }).min(1, {
    message: "パスワードは必須です",
  }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
