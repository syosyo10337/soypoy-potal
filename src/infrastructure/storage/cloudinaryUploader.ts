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

let isConfigured = false;

/**
 * Cloudinary設定を初期化（遅延初期化）
 *
 * トップレベルでの初期化を避けることで、クライアントバンドルへの
 * 環境変数の漏洩を防ぐ
 */
function initializeCloudinary(): void {
  if (isConfigured) return;

  const config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  };

  const missingVars = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key.toUpperCase());

  if (missingVars.length > 0) {
    throw new Error(
      `Cloudinary configuration is missing required environment variables: ${missingVars.join(", ")}`,
    );
  }

  cloudinary.config(config);

  isConfigured = true;
}

/**
 * 環境に応じたsuffixをフォルダ名に付与 (内部ヘルパー関数)
 *
 * APP_ENV環境変数を使用してsuffixを決定:
 * - production: {baseFolderName}-production
 * - preview: {baseFolderName}-preview
 * - development: {baseFolderName}-development
 *
 * @param baseFolderName - ベースとなるフォルダ名
 * @returns 環境suffixが付与されたフォルダ名
 */
function addEnvironmentSuffix(baseFolderName: string): string {
  const suffix = process.env.APP_ENV ?? "development";
  return `${baseFolderName}-${suffix}`;
}

export interface UploadImageOptions {
  /** アップロードするファイル */
  file: File;
  /** Cloudinary内のベースフォルダ名 (環境suffixは自動付与される) */
  folder: string;
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
 * // "soypoy-events-production" や "soypoy-events-dev" に自動振り分け
 * const url = await uploadImageToCloudinary({
 *   file: imageFile,
 *   folder: "soypoy-events",
 * });
 * ```
 */
export async function uploadImageToCloudinary({
  file,
  folder,
}: UploadImageOptions): Promise<string> {
  // Cloudinary設定の初期化（遅延初期化）
  initializeCloudinary();

  // 環境suffixを自動付与
  const folderWithEnvironment = addEnvironmentSuffix(folder);
  console.log(
    `[uploadImageToCloudinary] Uploading to folder: ${folderWithEnvironment}`,
  );

  // FileオブジェクトをBufferに変換
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  console.log(
    `[uploadImageToCloudinary] Buffer size: ${(buffer.length / 1024 / 1024).toFixed(2)}MB`,
  );

  // Cloudinaryにアップロード
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folderWithEnvironment,
        resource_type: "image",
        // 画像最適化設定
        transformation: [
          { quality: "auto" }, // 自動品質調整
          { fetch_format: "auto" }, // WebP/AVIF自動変換
        ],
      },
      (error, result) => {
        if (error) {
          console.error(
            "[uploadImageToCloudinary] Cloudinary API error:",
            error,
          );
          reject(
            new Error(`Cloudinary upload failed: ${error.message}`, {
              cause: error,
            }),
          );
        } else if (!result) {
          console.error(
            "[uploadImageToCloudinary] No result returned from Cloudinary",
          );
          reject(new Error("Cloudinary upload returned no result"));
        } else {
          console.log(
            `[uploadImageToCloudinary] Upload successful: ${result.secure_url}`,
          );
          resolve(result.secure_url);
        }
      },
    );

    uploadStream.end(buffer);
  });
}
