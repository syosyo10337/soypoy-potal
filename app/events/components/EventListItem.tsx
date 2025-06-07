import clsx from "clsx";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import type { Event } from "../types";

interface EventListItemProps {
  event: Event;
  selectedEventId?: number;
}

export default function EventListItem({
  event,
  selectedEventId,
}: EventListItemProps) {
  // JSTタイムゾーンで日付をパース
  const eventDate = DateTime.fromISO(event.date, { zone: "Asia/Tokyo" });

  return (
    <div
      id={`event-${event.id}`}
      key={event.id}
      className={clsx(
        "bg-gray-900/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300",
        selectedEventId === event.id && "ring-2 ring-purple-500",
      )}
    >
      <div className="md:flex">
        <div className="md:w-1/3 relative">
          <Image
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-48 md:h-full object-cover"
            width={800}
            height={400}
          />
        </div>
        <div className="p-5 md:w-2/3 flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-white">
            {event.title}
          </h3>
          <div className="flex flex-wrap gap-4 mb-3">
            <div className="flex items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{eventDate.toFormat("yyyy年MM月dd日")}</span>
            </div>
            <div className="flex items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{eventDate.toFormat("HH:mm")}</span>
            </div>
          </div>
          <p className="text-gray-300 mb-4 flex-grow">{event.description}</p>
          <Link
            href={`/events/${event.id}`}
            className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-600 transition-colors mt-auto w-fit"
          >
            詳細を見る
          </Link>
        </div>
      </div>
    </div>
  );
}
