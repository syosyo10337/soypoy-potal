import type { PickUpEvent } from "@/app/(home)/_dummies/pickUpEvent";
import GridItem from "./GridItem";

interface EventGridProps {
  events: PickUpEvent[];
}

export default function EventGrid({ events }: EventGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-6xl mx-auto text-center divide-x-1 divide-y-1 md:divide-y-0">
      {events.map((event, _index) => (
        <GridItem
          key={event.id}
          thumbnail={event.thumbnail}
          title={event.title}
          link={event.link}
          date={event.date}
          eventType={event.eventType}
        />
      ))}
    </div>
  );
}
