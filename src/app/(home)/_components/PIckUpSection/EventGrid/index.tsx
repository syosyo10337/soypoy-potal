import type { PickUpEvent } from "@/app/(home)/_dummies/pickUpEvent";
import { cn } from "@/utils/cn";
import GridItem from "./GridItem";

interface EventGridProps {
  events: PickUpEvent[];
}

export default function EventGrid({ events }: EventGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 xl:grid-cols-4",
        "w-full max-w-6xl mx-auto text-center",
      )}
    >
      {events.map((event, index) => (
        <GridItem
          key={event.id}
          thumbnail={event.thumbnail}
          title={event.title}
          link={event.link}
          date={event.date}
          eventType={event.eventType}
          index={index}
        />
      ))}
    </div>
  );
}
