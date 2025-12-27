"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@refinedev/core";
import { Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import { type LoginFormData, loginFormSchema } from "@/infrastructure/schemas";

export default function AdminLoginPage() {
  const { mutate: login, isPending } = useLogin<LoginFormData>();
  const [serverError, setServerError] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setServerError(null);

    login(data, {
      onError: (err) => {
        setServerError(err?.message || "ログインに失敗しました");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            SOY-POY 管理画面
          </CardTitle>
          <CardDescription>
            管理者アカウントでログインしてください
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {serverError && (
                <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                  {serverError}
                </div>
              )}

              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="admin@example.com"
                        aria-invalid={fieldState.invalid}
                        disabled={isPending}
                        className="pl-10"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">パスワード</FieldLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        aria-invalid={fieldState.invalid}
                        disabled={isPending}
                        className="pl-10"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Field>
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      ログイン中...
                    </span>
                  ) : (
                    "ログイン"
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
