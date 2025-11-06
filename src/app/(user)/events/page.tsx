import { notFound } from "next/navigation";
import type { EventEntity } from "@/domain/entities";
import { eventService } from "@/services/eventService";
import EventCalendar from "./_components/EventCalendar";

export const revalidate = 6;

export default async function EventsPage() {
  let events: EventEntity[];
  try {
    events = await eventService.getAllEvents();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to fetch events:", errorMessage);

    events = [];
  }

  if (events.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white">
        EVENTS
      </h1>
      <EventCalendar events={events} />
    </div>
  );
}
