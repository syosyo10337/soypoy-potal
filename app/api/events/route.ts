import { NextResponse } from "next/server";
import type { Event } from "../../events/types";
import { notion, notionDB } from "../_config";

export async function GET() {
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

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 },
    );
  }
}
