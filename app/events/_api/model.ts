import type { DatabaseSchema } from "@/api/_config/notionUtils";
import { NOTION_PROPERTY_TYPES } from "@/api/_config/notionUtils";

// Eventsデータベースのスキーマ定義
export const EVENTS_SCHEMA: DatabaseSchema = {
  id: { name: "ID", type: NOTION_PROPERTY_TYPES.UNIQUE_ID, required: true },
  title: { name: "Name", type: NOTION_PROPERTY_TYPES.TITLE, required: true },
  date: { name: "Date", type: NOTION_PROPERTY_TYPES.DATE, required: true },
  description: {
    name: "Description",
    type: NOTION_PROPERTY_TYPES.RICH_TEXT,
    required: false,
    defaultValue: "",
  },
  imageUrl: {
    name: "ImageUrl",
    type: NOTION_PROPERTY_TYPES.FILES,
    required: false,
    defaultValue: "",
  },
};
