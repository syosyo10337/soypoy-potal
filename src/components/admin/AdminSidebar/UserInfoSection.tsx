"use client";

import { useGetIdentity } from "@refinedev/core";
import { AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/shadcn/avatar";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { Skeleton } from "@/components/shadcn/skeleton";
import { type AdminUserEntity, AdminUserRole } from "@/domain/entities";

export function UserInfoSection() {
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useGetIdentity<AdminUserEntity>();

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-2 p-3 bg-destructive/10 rounded-md border border-destructive/20">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
          <p className="text-sm font-medium text-destructive">
            ユーザー情報の取得に失敗しました
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => refetch()}
          className="w-full"
        >
          再試行
        </Button>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case AdminUserRole.SuperAdmin:
        return "スーパー管理者";
      case AdminUserRole.Admin:
        return "管理者";
      default:
        return role;
    }
  };

  const getRoleVariant = (role: string) => {
    switch (role) {
      case AdminUserRole.SuperAdmin:
        return "destructive" as const;
      case AdminUserRole.Admin:
        return "default" as const;
      default:
        return "secondary" as const;
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-semibold truncate">{user.name}</p>
          <Badge variant={getRoleVariant(user.role)} className="shrink-0">
            {getRoleLabel(user.role)}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
      </div>
    </div>
  );
}
