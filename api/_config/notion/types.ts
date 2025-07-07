import type { PageObjectResponse } from "@notionhq/client";

// Notionの実際の型定義から動的に抽出
export type NotionPropertyType =
  PageObjectResponse["properties"][string]["type"];

// プロジェクトで実際に使用するプロパティ型のサブセット
export type UsedNotionPropertyType = Extract<
  NotionPropertyType,
  | "title"
  | "rich_text"
  | "date"
  | "files"
  | "number"
  | "unique_id"
  | "select"
  | "multi_select"
  | "checkbox"
  | "url"
  | "email"
  | "phone_number"
>;

export type PropertyValueTypeMap = {
  title: string;
  rich_text: string;
  date: string;
  files: string;
  number: number;
  unique_id: number;
  select: string;
  multi_select: string[];
  checkbox: boolean;
  url: string;
  email: string;
  phone_number: string;
};

export type PropertyValueType<T extends UsedNotionPropertyType> =
  PropertyValueTypeMap[T];

export interface PropertyDefinition<
  T extends UsedNotionPropertyType = UsedNotionPropertyType,
> {
  name: string;
  type: T;
  required?: boolean;
  defaultValue?: PropertyValueType<T>;
}

// データベーススキーマの型
export interface DatabaseSchema {
  [key: string]: PropertyDefinition;
}

// スキーマから型を自動推論するユーティリティ型
export type InferSchemaType<T extends DatabaseSchema> = {
  [K in keyof T]: PropertyValueType<T[K]["type"]>;
};
