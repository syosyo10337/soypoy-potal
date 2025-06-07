import { events } from "./dummy/events";
import EventCalendar from "./components/EventCalendar";

export default function EventsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white">
        EVENTS
      </h1>
      {/* // TODO: データ注入 */}
      <EventCalendar events={events} />
    </div>
  );
}
