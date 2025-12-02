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
 *
 * ⚠️ 注意: Next.js 15のServer ActionsではFileオブジェクトを直接渡すことができます
 */
export async function uploadImageAction(
  file: File,
): Promise<UploadImageResult> {
  console.log("[uploadImageAction] ========== UPLOAD START ==========");
  console.log("[uploadImageAction] Starting upload process");
  console.log("[uploadImageAction] File received:", {
    name: file?.name,
    size: file?.size,
    type: file?.type,
    constructor: file?.constructor?.name,
  });

  try {
    console.log("[uploadImageAction] Validating file...");
    if (!file || !(file instanceof File)) {
      console.error("[uploadImageAction] Invalid file:", {
        file,
        type: typeof file,
        hasFile: !!file,
      });
      return {
        success: false,
        error: "File is required",
      };
    }

    // ファイルサイズをログ出力（デバッグ用）
    const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
    console.log(
      `[uploadImageAction] File size: ${fileSizeMB}MB, name: ${file.name}`,
    );

    // 環境変数の確認（デバッグ用）
    const hasCloudinaryConfig = !!(
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    );
    console.log(
      `[uploadImageAction] Cloudinary config available: ${hasCloudinaryConfig}`,
    );
    console.log(
      `[uploadImageAction] CLOUDINARY_CLOUD_NAME: ${process.env.CLOUDINARY_CLOUD_NAME ? "SET" : "NOT SET"}`,
    );
    console.log(
      `[uploadImageAction] APP_ENV: ${process.env.APP_ENV || "development"}`,
    );

    console.log("[uploadImageAction] Starting Cloudinary upload...");
    // Cloudinaryにアップロード (環境別フォルダに自動振り分け)
    const url = await uploadImageToCloudinary({
      file,
      folder: "soypoy-events",
    });
    console.log("[uploadImageAction] Cloudinary upload completed");

    console.log(`[uploadImageAction] Upload successful: ${url}`);
    console.log("[uploadImageAction] ========== UPLOAD SUCCESS ==========");

    return {
      success: true,
      url,
    };
  } catch (error) {
    console.error("[uploadImageAction] ========== UPLOAD FAILED ==========");
    console.error("[uploadImageAction] Upload failed:", error);

    // より詳細なエラーメッセージを提供
    let errorMessage = "Failed to upload image";

    if (error instanceof Error) {
      errorMessage = error.message;

      // エラースタックも出力（デバッグ用）
      console.error("[uploadImageAction] Error stack:", error.stack);

      // エラーの cause も出力
      if (error.cause) {
        console.error("[uploadImageAction] Error cause:", error.cause);
      }
    } else {
      console.error(
        "[uploadImageAction] Unknown error type:",
        typeof error,
        error,
      );
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}
