import { z } from "zod";

/**
 * 画像フィールドのスキーマとアダプター (Infrastructure層)
 *
 * このファイルはZodバリデーションと型変換の責務を持つ
 * UIコンポーネント（ImageUploader）とは独立している
 */

export const IMAGE_FIELD_TYPES = {
  EXISTING: "existing",
  NEW: "new",
  EMPTY: "empty",
} as const;

export type ImageFieldType =
  (typeof IMAGE_FIELD_TYPES)[keyof typeof IMAGE_FIELD_TYPES];

/**
 * 画像フィールドのUnion型スキーマ
 * フォーム入力からのバリデーションに使用
 */
export const requiredImageFieldSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(IMAGE_FIELD_TYPES.EXISTING),
    url: z.url({ message: "有効なURLを入力してください" }),
  }),
  z.object({
    type: z.literal(IMAGE_FIELD_TYPES.NEW),
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

/**
 * ImageUploaderコンポーネントが扱う値の型
 * UIコンポーネントの責務に特化した型
 */
export type ImageValue = File | string | null | undefined;

/**
 * アダプター: Zodスキーマ型 → UIコンポーネント型
 * ImageFieldValue → ImageValue への変換
 */
export function imageFieldToImageValue(value: ImageFieldValue): ImageValue {
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
 * アダプター: UIコンポーネント型 → Zodスキーマ型
 * ImageValue → ImageFieldValue への変換
 */
export function imageValueToImageField(value: ImageValue): ImageFieldValue {
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

/**
 * Zodスキーマから直接URLを抽出するヘルパー
 * Repository層で使用（EventEntity.thumbnailはstring型）
 *
 * NEW画像の場合はCloudinaryにアップロードしてURLを返す
 */
export async function extractImageUrl(
  value: ImageFieldValue,
): Promise<string | undefined> {
  if (!value) return undefined;

  switch (value.type) {
    case IMAGE_FIELD_TYPES.EXISTING:
      return value.url;
    case IMAGE_FIELD_TYPES.NEW:
      // TODO: Cloudinaryへのアップロードを実装
      // 実装例:
      // import { uploadImageToCloudinary } from '@/infrastructure/storage/cloudinaryUploader';
      // return await uploadImageToCloudinary({ file: value.file });

      // 暫定: Fileオブジェクトは保存できないのでエラー
      throw new Error(
        "New image upload is not yet implemented. Please implement Cloudinary integration.",
      );
    case IMAGE_FIELD_TYPES.EMPTY:
      return undefined;
    default:
      return undefined;
  }
}
