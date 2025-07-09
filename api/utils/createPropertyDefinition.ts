import type {
  PropertyDefinition,
  PropertyValueType,
  UsedNotionPropertyType,
} from "../types";

/**
 * 型安全なスキーマ作成用のヘルパー関数
 * @param name プロパティ名
 * @param type プロパティ型
 * @param options オプション
 * @returns プロパティ定義
 */
export function createPropertyDefinition<T extends UsedNotionPropertyType>(
  name: string,
  type: T,
  options?: {
    required?: boolean;
    defaultValue?: PropertyValueType<T>;
  },
): PropertyDefinition<T> {
  return {
    name,
    type,
    required: options?.required,
    defaultValue: options?.defaultValue,
  };
}
