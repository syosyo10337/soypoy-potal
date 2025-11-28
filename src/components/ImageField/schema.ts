import { z } from "zod";

export const IMAGE_FIELD_TYPES = {
  EXISTING: "existing",
  NEW: "new",
  EMPTY: "empty",
} as const;

export type ImageFieldType =
  (typeof IMAGE_FIELD_TYPES)[keyof typeof IMAGE_FIELD_TYPES];

/**
 * 画像フィールドのUnion型スキーマ
 * NOTE: zod v4にするとFileでうまいこと定義することができそう。
 * @see https://zod.dev/api#files
 */
export const requiredImageFieldSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(IMAGE_FIELD_TYPES.EXISTING),
    url: z.url({ message: "有効なURLを入力してください" }),
  }),
  z.object({
    file: z
      .file()
      .mime(["image/png", "image/jpeg"], {
        message: "画像形式はJPEG、PNGのみ対応しています",
      })
      .max(5 * 1024 * 1024, {
        message: "画像サイズは5MB以下にしてください",
      }),
  }),
  z.object({
    type: z.literal(IMAGE_FIELD_TYPES.EMPTY),
  }),
]);

export type ImageFieldValue = z.infer<typeof requiredImageFieldSchema>;
