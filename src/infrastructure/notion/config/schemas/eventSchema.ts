import {
  type DatabaseSchema,
  type InferSchemaType,
  NOTION_PROPERTY_TYPES,
  createPropertyDefinition,
} from "../index";

// Eventsデータベースのスキーマ定義（型安全 & クリーン）
export const EVENTS_SCHEMA = {
  id: createPropertyDefinition("ID", NOTION_PROPERTY_TYPES.UNIQUE_ID, {
    required: true,
  }),
  title: createPropertyDefinition("Name", NOTION_PROPERTY_TYPES.TITLE, {
    required: true,
  }),
  date: createPropertyDefinition("Date", NOTION_PROPERTY_TYPES.DATE, {
    required: true,
  }),
  description: createPropertyDefinition(
    "Description",
    NOTION_PROPERTY_TYPES.RICH_TEXT,
    {
      required: false,
      defaultValue: "",
    },
  ),
  imageUrl: createPropertyDefinition("ImageUrl", NOTION_PROPERTY_TYPES.FILES, {
    required: false,
    defaultValue: "",
  }),
} as const satisfies DatabaseSchema;

export type NotionEvent = InferSchemaType<typeof EVENTS_SCHEMA>;
