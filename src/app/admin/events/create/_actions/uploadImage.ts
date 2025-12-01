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
      return {
        success: false,
        error: "File is required",
      };
    }

    // Cloudinaryにアップロード (環境別フォルダに自動振り分け)
    const url = await uploadImageToCloudinary({
      file,
      folder: "soypoy-events",
    });

    return {
      success: true,
      url,
    };
  } catch (error) {
    console.error("Image upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload image",
    };
  }
}
