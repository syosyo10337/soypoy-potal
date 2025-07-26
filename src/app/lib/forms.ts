import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ログインフォームのスキーマ
export const loginSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上必要です"),
});

// ログインフォームの型
export type LoginFormValues = z.infer<typeof loginSchema>;

// ログインフォームのカスタムフック
export const useLoginForm = () => {
  return useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
};

// ユーザー登録フォームのスキーマ
export const registerSchema = z
  .object({
    name: z.string().min(2, "名前は2文字以上必要です"),
    email: z.string().email("有効なメールアドレスを入力してください"),
    password: z.string().min(8, "パスワードは8文字以上必要です"),
    confirmPassword: z.string().min(8, "パスワードは8文字以上必要です"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

// ユーザー登録フォームの型
export type RegisterFormValues = z.infer<typeof registerSchema>;

// ユーザー登録フォームのカスタムフック
export const useRegisterForm = () => {
  return useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
};
