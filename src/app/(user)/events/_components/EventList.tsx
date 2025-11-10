"use client";

import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/shadcn/separator";
import { trpc } from "@/infrastructure/trpc/client";
import { EventListItem } from "./EventListItem";
import { EventListSkeleton } from "./EventListSkeleton";

export function EventList() {
  const searchParams = useSearchParams();
  const monthParam = searchParams.get("month");

  const now = new Date();
  const year = monthParam
    ? Number.parseInt(monthParam.split("-")[0] || String(now.getFullYear()), 10)
    : now.getFullYear();
  const month = monthParam
    ? Number.parseInt(
        monthParam.split("-")[1] || String(now.getMonth() + 1),
        10,
      )
    : now.getMonth() + 1;

  const eventsQuery = trpc.events.listByMonth.useQuery({ year, month });

  if (eventsQuery.isLoading) {
    return <EventListSkeleton />;
  }

  if (eventsQuery.error) {
    return (
      <div className="text-red-500">
        データの取得に失敗しました。もう一度お試しください。
      </div>
    );
  }

  const events = eventsQuery.data || [];

  return (
    <div>
      {events.length === 0 ? (
        <p className="text-gray-400 py-8">この月のイベントはありません。</p>
      ) : (
        <div className="space-y-0">
          {events.map((event, index) => (
            <div key={event.id}>
              <EventListItem event={event} isPickUp={index === 0} />
              {index < events.length - 1 && (
                <Separator className="bg-gray-700" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
