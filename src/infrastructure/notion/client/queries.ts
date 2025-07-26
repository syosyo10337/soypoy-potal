import type { PageObjectResponse } from "@notionhq/client";
import { isFullPage } from "@notionhq/client";
import type { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import type {
  NotionDBSchema,
  NotionPropertyTypeToTS,
  SupportedNotionPropertyType,
} from "../config";
import { notion } from "./notionClient";

/**
 * 汎用的なデータベースクエリ関数（List取得）
 * @param databaseId データベースID
 * @param schema スキーマ
 * @param options オプション
 * @returns クエリ結果
 */
export async function queryDatabase<T extends Record<string, unknown>>(
  databaseId: string,
  schema: NotionDBSchema,
  options?: {
    sorts?: QueryDatabaseParameters["sorts"];
    filter?: QueryDatabaseParameters["filter"];
    pageSize?: QueryDatabaseParameters["page_size"];
  },
): Promise<T[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: options?.sorts,
      filter: options?.filter,
      page_size: options?.pageSize || 100,
    });

    return response.results
      .filter(isFullPage)
      .map((page: PageObjectResponse) => parseNotionPage<T>(page, schema));
  } catch (error) {
    console.error("Error querying database:", error);
    throw new Error("Failed to query database");
  }
}

/**
 * 単一ページ取得関数（Find取得）
 * @param pageId ページID
 * @param schema スキーマ
 * @returns ページデータ
 */
export async function getPage<T extends Record<string, unknown>>(
  pageId: string,
  schema: NotionDBSchema,
): Promise<T | null> {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });

    if (isFullPage(response)) {
      return parseNotionPage<T>(response, schema);
    }

    return null;
  } catch (error) {
    console.error("Error retrieving page:", error);
    throw new Error("Failed to retrieve page");
  }
}

/**
 * Notionページオブジェクトから、スキーマに定義した型のオブジェクトへの変換関数
 * @param page Notionページ
 * @param schema スキーマ
 * @returns 変換後のオブジェクト
 */
function parseNotionPage<T extends Record<string, unknown>>(
  page: PageObjectResponse,
  schema: NotionDBSchema,
): T {
  const result: Record<string, unknown> = {};

  for (const [key, definition] of Object.entries(schema)) {
    const value = getPropertyValue(page, definition.name, definition.type);
    result[key] = value ?? definition.defaultValue;
  }

  return result as T;
}

/**
 * raw responseから、プロパティの値を取得するヘルパー関数
 * それぞれのpropertyタイプごとに、異なるデータの取得方法を定義する。
 *
 * e.g. "published"の値のセレクトボックスの時 raw responseは以下のようになる。
 * ```
 *  "Status": {
 *    "id": "Ibl%5C",
 *    "type": "select",
 *    "select": {
 *      "id": "7f078b19-5a0f-40f5-9981-0a10361b28ce",
 *      "name": "published",
 *      "color": "green"
 *    }
 *  },
 * ```
 * @param page ページのレスポンスオブジェクト
 * @param propertyName Notionのプロパティ名
 * @param propertyType Notionのプロパティ型
 * @returns プロパティの値
 */
function getPropertyValue(
  page: PageObjectResponse,
  propertyName: string,
  propertyType: SupportedNotionPropertyType,
): NotionPropertyTypeToTS<SupportedNotionPropertyType> | null {
  const property = page.properties[propertyName];
  if (!property || property.type !== propertyType) return null;

  switch (propertyType) {
    case "title":
      return (
        (property as Extract<typeof property, { type: "title" }>).title[0]
          ?.plain_text || ""
      );
    case "rich_text":
      return (
        (property as Extract<typeof property, { type: "rich_text" }>)
          .rich_text[0]?.plain_text || ""
      );
    case "date":
      return (
        (property as Extract<typeof property, { type: "date" }>).date?.start ||
        ""
      );
    case "files": {
      const files = (property as Extract<typeof property, { type: "files" }>)
        .files;
      const file = files[0];
      if (file && file.type === "file") {
        return file.file.url;
      }
      if (file && file.type === "external") {
        return file.external.url;
      }
      return "";
    }
    case "number":
      return (property as Extract<typeof property, { type: "number" }>).number;
    case "unique_id":
      return (property as Extract<typeof property, { type: "unique_id" }>)
        .unique_id.number;
    case "select":
      return (
        (property as Extract<typeof property, { type: "select" }>).select
          ?.name || ""
      );
    case "multi_select":
      return (
        property as Extract<typeof property, { type: "multi_select" }>
      ).multi_select.map((item) => item.name);
    case "checkbox":
      return (property as Extract<typeof property, { type: "checkbox" }>)
        .checkbox;
    case "url":
      return (property as Extract<typeof property, { type: "url" }>).url;
    case "email":
      return (property as Extract<typeof property, { type: "email" }>).email;
    default:
      return null;
  }
}
