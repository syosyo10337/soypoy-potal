import { notFound } from "next/navigation";
import EventCalendar from "./_components/EventCalendar";
import type { Event } from "./types";

async function getEvents(): Promise<Event[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`);
  if (!res.ok) {
    console.error(`Failed to fetch events ${res.statusText}`);
    console.error(await res.text());
    throw new Error("Failed to fetch events");
  }

  return res.json();
}

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
