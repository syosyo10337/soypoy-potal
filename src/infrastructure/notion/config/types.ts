import type { PageObjectResponse } from "@notionhq/client";
import type { NotionPropertyTypeToTS } from "./typeUtils";

/**
 * プロジェクトで実際に使用するプロパティ型のサブセット
 * PropertyValueTypeMapのキーから自動生成される
 * getPropertyValueでは未サポートのタイプを処理できないため、使用するプロパティをサブセットにしている
 */
export type SupportedNotionPropertyType = Extract<
  NotionPropertyType,
  keyof NotionPropertyTypeToTSMap
>;
/**
 * NotionのプロパティタイプのUnion
 */
type NotionPropertyType = PageObjectResponse["properties"][string]["type"];
/**
 * NotionDBのプロパティタイプとアプリ内での型をマッピング
 */
export interface NotionPropertyTypeToTSMap {
  title: string;
  rich_text: string;
  date: string;
  files: string;
  number: number;
  unique_id: string;
  select: string;
  multi_select: string[];
  checkbox: boolean;
  url: string;
  email: string;
}

/**
 * データベーススキーマの型
 */
export interface NotionDBSchema {
  [key: string]: PropertyDefinition;
}

/**
 * データベーススキーマのプロパティ定義
 *
 * @template T プロパティのタイプ
 */
interface PropertyDefinition<
  T extends SupportedNotionPropertyType = SupportedNotionPropertyType,
> {
  /** Notionデータベース内での実際のプロパティ名 */
  name: string;
  /** プロパティのタイプ */
  type: T;
  /** デフォルト値（オプション） */
  defaultValue?: NotionPropertyTypeToTS<T>;
}
