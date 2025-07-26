import {
  type NotionDBSchema,
  type InferSchemaType,
  NOTION_PROPERTY,
} from "@/infrastructure/notion/config";

export const eventSchema = {
  id: { name: "ID", type: NOTION_PROPERTY.UNIQUE_ID },
  publicationStatus: {
    name: "Status",
    type: NOTION_PROPERTY.SELECT,
  },
  title: { name: "Name", type: NOTION_PROPERTY.TITLE },
  date: { name: "Date", type: NOTION_PROPERTY.DATE },
  description: {
    name: "Description",
    type: NOTION_PROPERTY.RICH_TEXT,
    defaultValue: "",
  },
  imageUrl: {
    name: "ImageUrl",
    type: NOTION_PROPERTY.FILES,
    defaultValue: "",
  },
} as const satisfies NotionDBSchema;

export type NotionEvent = InferSchemaType<typeof eventSchema>;
