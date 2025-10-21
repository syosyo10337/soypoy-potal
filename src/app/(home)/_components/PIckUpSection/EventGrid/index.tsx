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
        "max-w-[73vw] md:max-w-[560px] xl:max-w-[80vw] 2xl:max-w-[70vw]", //NOTE: md~xlはタブレット表示なので横幅固定

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
