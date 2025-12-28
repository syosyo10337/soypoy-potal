"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { z } from "zod";
import {
  EditView,
  EditViewHeader,
} from "@/components/refine-ui/views/edit-view";
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
import type { AdminUserEntity } from "@/domain/entities";

const updateAdminSchema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  email: z.email("有効なメールアドレスを入力してください"),
  role: z.enum(["admin", "super_admin"]),
});

type UpdateAdminFormData = z.infer<typeof updateAdminSchema>;

// TODO: createと共通化する
export function AdminEditForm() {
  const {
    refineCore: { onFinish, query },
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AdminUserEntity, HttpError, UpdateAdminFormData>({
    resolver: zodResolver(updateAdminSchema),
    refineCoreProps: {
      resource: "admins",
      action: "edit",
      redirect: "show",
    },
  });

  const admin = query?.data?.data;

  const onSubmit = async (data: UpdateAdminFormData) => {
    try {
      await onFinish(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  if (!admin) {
    return null;
  }

  return (
    <EditView>
      <EditViewHeader title="管理者を編集" />
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
                defaultValue={admin.name}
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
                defaultValue={admin.email}
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
              <FieldLabel htmlFor="role">ロール</FieldLabel>
              <Controller
                name="role"
                control={control}
                defaultValue={
                  (admin.role as "admin" | "super_admin") ?? "admin"
                }
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
                {isSubmitting ? "保存中..." : "保存"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </EditView>
  );
}
