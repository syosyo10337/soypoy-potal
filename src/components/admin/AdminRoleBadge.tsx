import type { ComponentProps } from "react";
import { Badge } from "@/components/shadcn/badge";
import { adminRoleLabel } from "@/constant/adminRoleLabel";
import { AdminUserRole } from "@/domain/entities";
import { cn } from "@/utils/cn";

/**
 * EventStatusBadgeのバリアント型
 */
export type AdminRoleVariant = AdminUserRole;

/**
 * 管理者ロールバリアントごとのBadgeバリアントマッピング
 */
const statusBadgeVariants: Record<
  AdminRoleVariant,
  ComponentProps<typeof Badge>["variant"]
> = {
  [AdminUserRole.Admin]: "outline",
  [AdminUserRole.SuperAdmin]: "default",
} as const;

export interface AdminRoleBadgeProps {
  variant: AdminRoleVariant;
  className?: string;
}

/**
 * 管理者のロールバッジ
 *
 * AdminUserRoleと1:1で対応するvariantを受け取り、
 * 適切なBadgeスタイルとラベルを表示
 *
 * @example
 * <AdminRoleBadge variant="admin" />
 * <AdminRoleBadge variant="super_admin" />
 */
export function AdminRoleBadge({ variant, className }: AdminRoleBadgeProps) {
  return (
    <Badge variant={statusBadgeVariants[variant]} className={cn(className)}>
      {adminRoleLabel[variant]}
    </Badge>
  );
}
