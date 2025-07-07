import type { PageObjectResponse } from "@notionhq/client";
import { isFullPage } from "@notionhq/client";
import type { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import type { DatabaseSchema, UsedNotionPropertyType } from "./notion";
import { notion } from "./notionClient";

// 汎用的なNotionページからオブジェクトへの変換関数
export function parseNotionPage<T extends Record<string, any>>(
  page: PageObjectResponse,
  schema: DatabaseSchema,
): T {
  const result: Record<string, any> = {};

  for (const [key, definition] of Object.entries(schema)) {
    const value = getPropertyValue(page, definition.name, definition.type);
    result[key] = value ?? definition.defaultValue;
  }

  return result as T;
}

// プロパティ値を取得するヘルパー関数
function getPropertyValue(
  page: PageObjectResponse,
  propertyName: string,
  propertyType: UsedNotionPropertyType,
): any {
  const property = page.properties[propertyName];
  if (!property || property.type !== propertyType) return null;

  switch (propertyType) {
    case "title":
      return (property as any).title[0]?.plain_text || "";
    case "rich_text":
      return (property as any).rich_text[0]?.plain_text || "";
    case "date":
      return (property as any).date?.start || "";
    case "files": {
      const files = (property as any).files;
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
      return (property as any).number;
    case "unique_id":
      return (property as any).unique_id.number;
    case "select":
      return (property as any).select?.name || "";
    case "multi_select":
      return (property as any).multi_select.map((item: any) => item.name);
    case "checkbox":
      return (property as any).checkbox;
    case "url":
      return (property as any).url;
    case "email":
      return (property as any).email;
    case "phone_number":
      return (property as any).phone_number;
    default:
      return null;
  }
}

// 汎用的なデータベースクエリ関数
export async function queryDatabase<T extends Record<string, any>>(
  databaseId: string,
  schema: DatabaseSchema,
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

// 単一ページ取得関数
export async function getPage<T extends Record<string, any>>(
  pageId: string,
  schema: DatabaseSchema,
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

// 型定義、定数、ヘルパー関数は ./notion/ から再エクスポート
export * from "./notion";
