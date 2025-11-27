import Link from "next/link";
import {
  EditView,
  EditViewHeader,
} from "@/components/refine-ui/views/edit-view";
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

interface EventNotFoundProps {
  viewType: "show" | "edit";
}

/**
 * イベントの404状態（詳細・編集共通）
 *
 * データが存在しない際に表示
 */
export function EventNotFound({ viewType }: EventNotFoundProps) {
  const View = viewType === "show" ? ShowView : EditView;
  const ViewHeader = viewType === "show" ? ShowViewHeader : EditViewHeader;

  return (
    <View>
      <ViewHeader />
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
    </View>
  );
}
