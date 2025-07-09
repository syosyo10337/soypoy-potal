import { notFound } from "next/navigation";
import { getEvents } from "./_api/endpoints";
import EventCalendar from "./_components/EventCalendar";

export default async function EventsPage() {
  const events = await getEvents();
  if (events.length === 0) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white">
        EVENTS
      </h1>
      <EventCalendar events={events} />
    </div>
  );
}
