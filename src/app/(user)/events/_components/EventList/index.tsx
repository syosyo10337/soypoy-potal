import { Separator } from "@/components/shadcn/separator";
import type { EventEntity } from "@/domain/entities";
import { EventListItem } from "./EventListItem";

interface EventListProps {
  events: EventEntity[];
}

export async function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return <p className="py-8">この月のイベントはありません。</p>;
  }

  return (
    <div className="space-y-0">
      <Separator className="border-1" />
      {events.map((event, _) => (
        <div key={event.id}>
          <EventListItem event={event} />
          <Separator className="border-1" />
        </div>
      ))}
    </div>
  );
}
