import type {
  NotionDBSchema,
  NotionPropertyTypeToTSMap,
  SupportedNotionPropertyType,
} from "./types";

/**
 * スキーマからTS型を自動推論するユーティリティ型
 *
 * @template T スキーマの型
 * @returns スキーマから生成されるTypeScript型
 */
export type InferSchemaType<T extends NotionDBSchema> = {
  [K in keyof T]: NotionPropertyTypeToTS<T[K]["type"]>;
};
/**
 * Notionのプロパティタイプから対応するTypeScript型を取得するユーティリティ型
 */
export type NotionPropertyTypeToTS<T extends SupportedNotionPropertyType> =
  NotionPropertyTypeToTSMap[T];
