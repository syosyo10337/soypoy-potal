"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { z } from "zod";
import {
  CreateView,
  CreateViewHeader,
} from "@/components/refine-ui/views/create-view";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Field, FieldError, FieldLabel } from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";

const createAdminSchema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  email: z.email("有効なメールアドレスを入力してください"),
  password: z.string().min(12, "パスワードは12文字以上で入力してください"),
  role: z.enum(["admin", "super_admin"]),
});

type CreateAdminFormData = z.infer<typeof createAdminSchema>;

type Admin = {
  id: string;
  name: string;
  email: string;
  role: string | null;
};

export function CreateAdminForm() {
  const {
    refineCore: { onFinish },
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Admin, HttpError, CreateAdminFormData>({
    resolver: zodResolver(createAdminSchema),
    refineCoreProps: {
      resource: "admins",
      action: "create",
      redirect: "list",
    },
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "admin",
    },
  });

  const onSubmit = async (data: CreateAdminFormData) => {
    try {
      await onFinish(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <CreateView>
      <CreateViewHeader title="管理者を作成" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>管理者情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel htmlFor="name">名前</FieldLabel>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input id="name" placeholder="管理者名" {...field} />
                )}
              />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    {...field}
                  />
                )}
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">パスワード</FieldLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    id="password"
                    type="password"
                    placeholder="12文字以上"
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="role">ロール</FieldLabel>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="ロールを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">管理者</SelectItem>
                      <SelectItem value="super_admin">
                        スーパー管理者
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && <FieldError>{errors.role.message}</FieldError>}
            </Field>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "作成中..." : "作成"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </CreateView>
  );
}
