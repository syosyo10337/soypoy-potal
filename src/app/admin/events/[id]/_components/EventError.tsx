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

interface EventErrorProps {
  viewType: "show" | "edit";
  onRetry?: () => void;
}

/**
 * イベントのエラー状態（詳細・編集共通）
 *
 * useOneまたはuseShowのisErrorがtrueの際に表示
 */
export function EventError({ viewType, onRetry }: EventErrorProps) {
  const View = viewType === "show" ? ShowView : EditView;
  const ViewHeader = viewType === "show" ? ShowViewHeader : EditViewHeader;

  return (
    <View>
      <ViewHeader />
      <Card className="max-w-2xl mx-auto mt-8 border-destructive">
        <CardHeader>
          <CardTitle className="text-2xl text-destructive">
            エラーが発生しました
          </CardTitle>
          <CardDescription>
            イベントの読み込み中に問題が発生しました。
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          {onRetry && (
            <Button onClick={onRetry} variant="default">
              再試行
            </Button>
          )}
          <Button asChild variant="outline">
            <Link href="/admin/events">イベント一覧に戻る</Link>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}

