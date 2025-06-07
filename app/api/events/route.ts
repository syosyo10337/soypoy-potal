import { NextResponse } from "next/server";
import { notion, DATABASE_ID } from "../../../api/notion/client";
import { Event } from "../../events/types";

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          property: "Date",
          direction: "ascending",
        },
      ],
    });

    //TODO: Notionでプロパティを定義する
    const events: Partial<Event>[] = response.results.map((page: any) => {
      const properties = page.properties;
      return {
        id: page.id,
        title: properties.Name.title[0]?.plain_text || "",
        date: properties.Date.date?.start || "",
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
