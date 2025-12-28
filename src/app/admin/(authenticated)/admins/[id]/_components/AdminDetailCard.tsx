"use client";

import { useState } from "react";
import { useDelete, useGetIdentity } from "@refinedev/core";
import { useRouter } from "next/navigation";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/dialog";
import { KeyRound, Trash2, Copy, Check } from "lucide-react";
import type { AppRouter } from "@/infrastructure/trpc/router";

type Admin = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type AdminDetailCardProps = {
  admin: Admin;
};

const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: "/api/trpc" })],
});

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

export function AdminDetailCard({ admin }: AdminDetailCardProps) {
  const router = useRouter();
  const { data: identity } = useGetIdentity<{ id: string; role?: string }>();
  const { mutate: deleteAdmin } = useDelete();

  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [copied, setCopied] = useState(false);

  const isSuperAdmin = identity?.role === "super_admin";
  const isSelf = identity?.id === admin.id;

  const handleResetPassword = async () => {
    setIsResetting(true);
    try {
      const result = await trpcClient.admins.resetPassword.mutate({
        userId: admin.id,
      });
      setTempPassword(result.tempPassword);
    } catch (error) {
      console.error("Password reset failed:", error);
      alert("パスワードのリセットに失敗しました");
    } finally {
      setIsResetting(false);
    }
  };

  const handleCopyPassword = async () => {
    if (tempPassword) {
      await navigator.clipboard.writeText(tempPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDelete = () => {
    deleteAdmin(
      { resource: "admins", id: admin.id },
      {
        onSuccess: () => {
          router.push("/admin/admins");
        },
      },
    );
  };

  const formattedCreatedAt = new Date(admin.createdAt).toLocaleDateString(
    "ja-JP",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const formattedUpdatedAt = new Date(admin.updatedAt).toLocaleDateString(
    "ja-JP",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{admin.name}</CardTitle>
              <CardDescription>{admin.email}</CardDescription>
            </div>
            <Badge variant={getRoleBadgeVariant(admin.role)}>
              {getRoleLabel(admin.role)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">作成日時</p>
              <p className="font-medium">{formattedCreatedAt}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">更新日時</p>
              <p className="font-medium">{formattedUpdatedAt}</p>
            </div>
          </div>

          {isSuperAdmin && (
            <div className="flex gap-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsResetDialogOpen(true)}
                disabled={isSelf}
              >
                <KeyRound className="h-4 w-4 mr-2" />
                パスワードをリセット
              </Button>
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
                disabled={isSelf}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                削除
              </Button>
            </div>
          )}

          {isSelf && isSuperAdmin && (
            <p className="text-sm text-muted-foreground">
              ※ 自分自身のパスワードリセット・削除はできません
            </p>
          )}
        </CardContent>
      </Card>

      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>パスワードをリセット</DialogTitle>
            <DialogDescription>
              {admin.name} のパスワードをリセットしますか？
            </DialogDescription>
          </DialogHeader>

          {tempPassword ? (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  一時パスワード
                </p>
                <div className="flex items-center gap-2">
                  <code className="text-lg font-mono font-bold flex-1">
                    {tempPassword}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyPassword}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-sm text-destructive">
                ⚠️
                このパスワードは一度しか表示されません。必ずユーザーに伝えてください。
              </p>
              <DialogFooter>
                <Button
                  onClick={() => {
                    setIsResetDialogOpen(false);
                    setTempPassword(null);
                  }}
                >
                  閉じる
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsResetDialogOpen(false)}
              >
                キャンセル
              </Button>
              <Button onClick={handleResetPassword} disabled={isResetting}>
                {isResetting ? "リセット中..." : "リセット"}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>管理者を削除</DialogTitle>
            <DialogDescription>
              {admin.name} を削除しますか？この操作は取り消せません。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              キャンセル
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              削除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}





