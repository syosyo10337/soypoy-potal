import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email({ message: "有効なメールアドレスを入力してください" }),
  password: z.string({ message: "パスワードを入力してください" }).min(1, {
    message: "パスワードは必須です",
  }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
