import { NOTION_DB_KEYS, queryDatabase } from "@/api";
import { EVENTS_SCHEMA, type Event } from "./model";

export async function getEvents(): Promise<Event[]> {
  try {
    return await queryDatabase<Event>(NOTION_DB_KEYS.events, EVENTS_SCHEMA, {
      sorts: [{ property: "Date", direction: "ascending" }],
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
}
