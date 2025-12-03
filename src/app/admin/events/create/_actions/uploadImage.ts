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
  try {
    if (!file || !(file instanceof File)) {
      return {
        success: false,
        error: "File is required",
      };
    }

    const url = await uploadImageToCloudinary({
      file,
      folder: "soypoy-events",
    });

    return {
      success: true,
      url,
    };
  } catch (error) {
    console.error("[uploadImageAction] Upload failed:", error);

    let errorMessage = "Failed to upload image";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}
