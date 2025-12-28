"use client";

import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { TableCell, TableRow } from "@/components/shadcn/table";
import type { AdminUserEntity } from "@/domain/entities";
import { formatDateJP } from "@/utils/date";

type AdminTableRowProps = {
  admin: AdminUserEntity;
};

function getRoleBadgeVariant(role: string | null) {
  switch (role) {
    case "super_admin":
      return "default";
    case "admin":
      return "secondary";
    default:
      return "outline";
  }
}

function getRoleLabel(role: string | null) {
  switch (role) {
    case "super_admin":
      return "スーパー管理者";
    case "admin":
      return "管理者";
    default:
      return "不明";
  }
}
// TODO: 削除含めたアクションを追加する。buttonを使うこと
export function AdminTableRow({ admin }: AdminTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{admin.name}</TableCell>
      <TableCell>{admin.email}</TableCell>
      <TableCell>
        <Badge variant={getRoleBadgeVariant(admin.role)}>
          {getRoleLabel(admin.role)}
        </Badge>
      </TableCell>
      <TableCell>{formatDateJP(admin.createdAt)}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/admins/${admin.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/admins/${admin.id}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
