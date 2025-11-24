import { api } from "@/infrastructure/trpc/server";

/**
 * イベント件数表示
 *
 * Server Componentとして動作
 * 内部でデータフェッチを行い、件数を表示
 */
export async function EventsCount() {
  const events = await api.events.list();

  return (
    <div className="text-sm text-muted-foreground">合計 {events.length} 件</div>
  );
}
