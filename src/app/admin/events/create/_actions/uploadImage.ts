"use server";

import { uploadImageToCloudinary } from "@/infrastructure/storage/cloudinaryUploader";

type UploadImageResult =
  | {
      success: true;
      url: string;
    }
  | {
      success: false;
      error: string;
    };
/**
 * 画像アップロードServer Action
 *
 * Fileオブジェクトを受け取り、CloudinaryにアップロードしてURLを返す
 */
export async function uploadImageAction(
  file: File,
): Promise<UploadImageResult> {
  try {
    if (!file || !(file instanceof File)) {
      console.error("Invalid file:", { file });
      return {
        success: false,
        error: "File is required",
      };
    }

    // ファイルサイズをログ出力（デバッグ用）
    const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
    console.log(`[uploadImageAction] File size: ${fileSizeMB}MB, name: ${file.name}`);

    // 環境変数の確認（デバッグ用）
    const hasCloudinaryConfig = !!(
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    );
    console.log(`[uploadImageAction] Cloudinary config available: ${hasCloudinaryConfig}`);
    console.log(`[uploadImageAction] APP_ENV: ${process.env.APP_ENV || "development"}`);

    // Cloudinaryにアップロード (環境別フォルダに自動振り分け)
    const url = await uploadImageToCloudinary({
      file,
      folder: "soypoy-events",
    });

    console.log(`[uploadImageAction] Upload successful: ${url}`);

    return {
      success: true,
      url,
    };
  } catch (error) {
    console.error("[uploadImageAction] Upload failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload image",
    };
  }
}
