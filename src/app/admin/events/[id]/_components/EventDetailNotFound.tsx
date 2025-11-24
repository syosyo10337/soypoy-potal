import Link from "next/link";
import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

/**
 * イベント詳細の404状態
 *
 * useOneでデータが存在しない際に表示
 */
export function EventDetailNotFound() {
  return (
    <ShowView>
      <ShowViewHeader />
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-2xl">イベントが見つかりません</CardTitle>
          <CardDescription>
            指定されたIDのイベントは存在しないか、削除された可能性があります。
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button asChild>
            <Link href="/admin/events">イベント一覧に戻る</Link>
          </Button>
        </CardContent>
      </Card>
    </ShowView>
  );
}
