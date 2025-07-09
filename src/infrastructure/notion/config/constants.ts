import type { UsedNotionPropertyType } from "./types";

/**
 * 型から値を抽出してenum的に使用できる定数オブジェクト
 * データモデルのスキーマを定義する際に利用する。
 */
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
} as const satisfies Record<string, UsedNotionPropertyType>;

export const NOTION_DB_KEYS = {
  events: process.env.NOTION_EVENTS_DB_ID || "",
  members: process.env.NOTION_MEMBERS_DB_ID || "",
} as const;
