import { notionDBKeys } from "@/api/_config";
import { queryDatabase } from "@/api/_config/notionUtils";
import type { Event } from "./model";
import { EVENTS_SCHEMA } from "./model";

export async function getEvents(): Promise<Event[]> {
  try {
    return await queryDatabase<Event>(notionDBKeys.events, EVENTS_SCHEMA, {
      sorts: [
        {
          property: "Date",
          direction: "ascending",
        },
      ],
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
}
