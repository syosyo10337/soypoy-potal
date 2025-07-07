import type { UsedNotionPropertyType } from "./types";

// 型から値を抽出してenum的に使用できる定数オブジェクト
export const NOTION_PROPERTY_TYPES = {
  TITLE: "title",
  RICH_TEXT: "rich_text",
  DATE: "date",
  FILES: "files",
  NUMBER: "number",
  UNIQUE_ID: "unique_id",
  SELECT: "select",
  MULTI_SELECT: "multi_select",
  CHECKBOX: "checkbox",
  URL: "url",
  EMAIL: "email",
  PHONE_NUMBER: "phone_number",
} as const satisfies Record<string, UsedNotionPropertyType>;
