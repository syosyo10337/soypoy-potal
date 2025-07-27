import { DateTime } from "luxon";
import type { EventEntity } from "@/domain/entities/event";
import { dateTimeFromISO } from "@/utils/date";

interface EventCalendarTileProps {
  events: EventEntity[];
  date: Date;
  view: string;
  onEventClick: (eventId: string) => void;
}

// TODO: propsを見直す。
export function EventCalendarTile({
  events,
  date,
  view,
  onEventClick,
}: EventCalendarTileProps) {
  if (view !== "month") return null;

  const currentDate = DateTime.fromJSDate(date).startOf("day").toISO();
  const eventsForDay = events.filter((event) => {
    const eventDate = dateTimeFromISO(event.date).startOf("day").toISO();
    return eventDate === currentDate;
  });

  if (eventsForDay.length === 0) return null;

  return (
    <div className="event-marker">
      {eventsForDay.map((event, index) => (
        // biome-ignore lint/a11y/useSemanticElements: react-calendarのTileが既にbutton要素のため、ネストを避ける必要がある
        <div
          key={event.id}
          className="text-xs text-white bg-purple-600 rounded px-1 mt-1 truncate w-full text-left cursor-pointer hover:bg-purple-500"
          style={{
            marginTop: index > 0 ? "2px" : "0",
            zIndex: 50,
            position: "relative",
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEventClick(event.id);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onEventClick(event.id);
            }
          }}
          aria-label={`${event.title}のイベントを表示`}
        >
          {event.title}
        </div>
      ))}
    </div>
  );
}
