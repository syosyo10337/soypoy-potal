import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { api } from "@/infrastructure/trpc/server";
import { NoEventsRow } from "./NoEventsRow";
import { EventTableRow } from "./Row";

/**
 * イベント一覧テーブル
 *
 * Server Componentとして動作
 * 内部でデータフェッチを行い、テーブルとして表示
 * Suspense境界で囲むことで、ローディング状態を管理
 */
export async function EventsTable() {
  const events = await api.events.list();

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>タイトル</TableHead>
              <TableHead>日付</TableHead>
              <TableHead>種類</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length === 0 ? (
              <NoEventsRow />
            ) : (
              events.map((event) => (
                <EventTableRow key={event.id} event={event} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-muted-foreground">
        合計 {events.length} 件
      </div>
    </>
  );
}
