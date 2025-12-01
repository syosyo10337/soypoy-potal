/**
 * Cloudinary画像アップローダー (Infrastructure層)
 *
 * 画像をCloudinaryにアップロードし、URLを返す
 * サーバーサイドでのみ実行可能
 *
 * @requires cloudinary - インストール: pnpm add cloudinary
 * @requires 環境変数 - CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 */

import { v2 as cloudinary } from "cloudinary";

// Cloudinary設定の初期化
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadImageOptions {
  /** アップロードするファイル */
  file: File;
  /** Cloudinary内のフォルダ名 (デフォルト: "soypoy-events") */
  folder?: string;
}

/**
 * 画像をCloudinaryにアップロードし、URLを返す
 *
 * @param options - アップロードオプション
 * @returns アップロードされた画像のURL (https://...)
 * @throws アップロード失敗時にエラー
 *
 * @example
 * ```typescript
 * const url = await uploadImageToCloudinary({
 *   file: imageFile,
 *   folder: 'soypoy-events',
 * });
 * ```
 */
export async function uploadImageToCloudinary({
  file,
  folder = "soypoy-events",
}: UploadImageOptions): Promise<string> {
  // FileオブジェクトをBufferに変換
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Cloudinaryにアップロード
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        // 画像最適化設定
        transformation: [
          { quality: "auto" }, // 自動品質調整
          { fetch_format: "auto" }, // WebP/AVIF自動変換
        ],
      },
      (error, result) => {
        if (error) {
          reject(
            new Error(`Cloudinary upload failed: ${error.message}`, {
              cause: error,
            }),
          );
        } else if (!result) {
          reject(new Error("Cloudinary upload returned no result"));
        } else {
          resolve(result.secure_url);
        }
      },
    );

    uploadStream.end(buffer);
  });
}

/**
 * Cloudinaryから画像を削除
 *
 * @param url - 削除する画像のURL
 * @returns 削除結果
 *
 * @example
 * ```typescript
 * await deleteImageFromCloudinary('https://res.cloudinary.com/.../image.jpg');
 * ```
 */
export async function deleteImageFromCloudinary(
  url: string,
): Promise<{ result: string }> {
  // URLからpublic_idを抽出
  // https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{public_id}.{format}
  const matches = url.match(/\/v\d+\/(.+)\.\w+$/);
  if (!matches || !matches[1]) {
    throw new Error(`Invalid Cloudinary URL: ${url}`);
  }

  const publicId = matches[1];
  return await cloudinary.uploader.destroy(publicId);
}
