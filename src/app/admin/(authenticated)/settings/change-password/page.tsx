"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useChangePassword } from "@/app/admin/_hooks/useTrpcMutations";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Field, FieldError, FieldLabel } from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import { Separator } from "@/components/shadcn/separator";
import { cn } from "@/utils/cn";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "現在のパスワードを入力してください"),
    newPassword: z
      .string()
      .min(12, "新しいパスワードは12文字以上で入力してください"),
    confirmPassword: z.string().min(1, "確認用パスワードを入力してください"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "新しいパスワードが一致しません",
    path: ["confirmPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
  const [success, setSuccess] = useState(false);
  const changePassword = useChangePassword();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    changePassword.mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          setSuccess(true);
          reset();
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center relative gap-2">
        <div className="bg-background z-[2] pr-4">
          <Breadcrumb />
        </div>
        <Separator className={cn("absolute", "left-0", "right-0", "z-[1]")} />
      </div>
      <h2 className="text-2xl font-bold">パスワード変更</h2>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>パスワードを変更</CardTitle>
          <CardDescription>
            セキュリティのため、定期的にパスワードを変更することをお勧めします
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Field>
              <FieldLabel htmlFor="currentPassword">
                現在のパスワード
              </FieldLabel>
              <Controller
                name="currentPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="現在のパスワード"
                    {...field}
                  />
                )}
              />
              {errors.currentPassword && (
                <FieldError>{errors.currentPassword.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="newPassword">新しいパスワード</FieldLabel>
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="12文字以上"
                    {...field}
                  />
                )}
              />
              {errors.newPassword && (
                <FieldError>{errors.newPassword.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">
                新しいパスワード（確認）
              </FieldLabel>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="もう一度入力"
                    {...field}
                  />
                )}
              />
              {errors.confirmPassword && (
                <FieldError>{errors.confirmPassword.message}</FieldError>
              )}
            </Field>

            <div className="pt-4">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "変更中..." : "パスワードを変更"}
              </Button>
            </div>
          </form>

          {success && (
            <div className="flex items-center gap-2 p-4 mt-4 bg-green-50 text-green-700 rounded-md">
              <CheckCircle className="h-5 w-5" />
              <span>パスワードを変更しました</span>
            </div>
          )}

          {changePassword.error && (
            <div className="p-4 mt-4 bg-destructive/10 text-destructive rounded-md">
              {changePassword.error.message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
