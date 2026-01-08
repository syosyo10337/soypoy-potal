import { UserX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

export function AdminNotFound() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserX className="h-5 w-5 text-muted-foreground" />
          <CardTitle>管理者が見つかりません</CardTitle>
        </div>
        <CardDescription>
          指定された管理者は存在しないか、削除された可能性があります
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href="/admin/admins">管理者一覧に戻る</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
