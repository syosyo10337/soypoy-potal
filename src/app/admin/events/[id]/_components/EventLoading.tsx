import {
  EditView,
  EditViewHeader,
} from "@/components/refine-ui/views/edit-view";
import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

interface EventLoadingProps {
  viewType: "show" | "edit";
}

/**
 * イベントのローディング状態（詳細・編集共通）
 *
 * useOneまたはuseShowのisLoadingがtrueの際に表示
 */
export function EventLoading({ viewType }: EventLoadingProps) {
  const View = viewType === "show" ? ShowView : EditView;
  const ViewHeader = viewType === "show" ? ShowViewHeader : EditViewHeader;

  return (
    <View>
      <ViewHeader />
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="h-8 w-64 bg-muted animate-pulse rounded" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* ID */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              {viewType === "show" ? "ID" : "タイトル"}
            </h3>
            <div className="h-5 w-32 bg-muted animate-pulse rounded" />
          </div>

          {/* 日付 */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              日付
            </h3>
            <div className="h-5 w-24 bg-muted animate-pulse rounded" />
          </div>

          {/* 種類 */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              種類
            </h3>
            <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
          </div>

          {/* 公開ステータス */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              公開ステータス
            </h3>
            <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
          </div>

          {/* 説明 */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              説明
            </h3>
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted animate-pulse rounded" />
              <div className="h-4 w-full bg-muted animate-pulse rounded" />
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
            </div>
          </div>

          {/* サムネイル */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              サムネイル
            </h3>
            <div className="h-[300px] w-full max-w-md bg-muted animate-pulse rounded-md" />
          </div>
        </CardContent>
      </Card>
    </View>
  );
}

