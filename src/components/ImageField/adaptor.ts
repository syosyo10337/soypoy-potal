/**
 * 異なるスキーマ型とImageUploader間のアダプター層
 * この層で型変換の責務を集約し、変更の影響を局所化する
 */

import { IMAGE_FIELD_TYPES, type ImageFieldValue } from "./schema";
import type { ImageValue } from "./type";

/**
 * Zod discriminated union → ImageUploader value
 */
function fromImageFieldValue(value: ImageFieldValue): ImageValue {
  if (!value) return undefined;

  switch (value.type) {
    case IMAGE_FIELD_TYPES.EXISTING:
      return value.url;
    case IMAGE_FIELD_TYPES.NEW:
      return value.file;
    case IMAGE_FIELD_TYPES.EMPTY:
      return null;
    default:
      return undefined;
  }
}

/**
 * ImageUploader value → Zod discriminated union
 */
function toImageFieldValue(value: ImageValue): ImageFieldValue {
  if (!value || value === null) {
    return { type: "empty" };
  }

  if (typeof value === "string") {
    return { type: IMAGE_FIELD_TYPES.EXISTING, url: value };
  }

  if (value instanceof File) {
    return { type: IMAGE_FIELD_TYPES.NEW, file: value };
  }

  return { type: IMAGE_FIELD_TYPES.EMPTY };
}

// Zodスキーマ用のアダプター
export const zodImageAdapter = {
  fromSchema: fromImageFieldValue,
  toSchema: toImageFieldValue,
};
