import { notion, notionDB } from "@/api/_config";
import type { Event } from "./model";

export async function getEvents(): Promise<Event[]> {
  try {
    const response = await notion.databases.query({
      database_id: notionDB.events,
      sorts: [
        {
          property: "Date",
          direction: "ascending",
        },
      ],
    });

    // biome-ignore lint/suspicious/noExplicitAny: Notionの型定義が複雑なため TODO: 型定義を修正する
    const events: Event[] = response.results.map((page: any) => {
      const properties = page.properties;

      return {
        id: properties.ID.unique_id.number,
        title: properties.Name.title[0]?.plain_text || "",
        date: properties.Date.date?.start || "",
        description: properties.Description.rich_text[0]?.plain_text || "",
        imageUrl: properties.ImageUrl.files[0]?.file.url || "",
      };
    });

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
}