import { format } from "date-fns";
import { events } from "../dummy/events";

interface EventCalendarTileProps {
  date: Date;
  view: string;
  onEventClick: (eventId: number) => void;
}

// TODO: propsを見直す。
export default function EventCalendarTile({
  date,
  view,
  onEventClick,
}: EventCalendarTileProps) {
  if (view !== "month") return null;

  // その日に開催されるすべてのイベントを検索
  const formattedDate = format(date, "yyyy-MM-dd");
  const eventsForDay = events.filter((event) => event.date === formattedDate);

  if (eventsForDay.length === 0) return null;

  return (
    <div className="event-marker">
      {eventsForDay.map((event, index) => (
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
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              onEventClick(event.id);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`${event.title}のイベントを表示`}
        >
          {event.title}
        </div>
      ))}
    </div>
  );
} 
