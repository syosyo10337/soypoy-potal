"use client";

import { useState } from "react";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { uploadImageAction } from "../create/_actions/uploadImage";

/**
 * 画像アップロード用カスタムフック
 *
 * Fileオブジェクトを含むフォームデータを受け取り、
 * 必要に応じてServer Actionでアップロードし、URLに変換する
 */
export function useImageUpload() {
  const [isFileUploading, setIsFileUploading] = useState(false);

  /**
   * Fileが含まれている場合はアップロードしてURLに変換
   * アップロード失敗時はnullを返す
   */
  const uploadIfNeeded = async <
    T extends FieldValues & { thumbnail?: File | string | null },
  >(
    data: T,
    setError: UseFormSetError<T>,
  ): Promise<(Omit<T, "thumbnail"> & { thumbnail?: string | null }) | null> => {
    let thumbnail = data.thumbnail;

    if (thumbnail instanceof File) {
      setIsFileUploading(true);
      try {
        const result = await uploadImageAction(thumbnail);

        if (!result.success) {
          throw new Error(result.error);
        }
        thumbnail = result.url;
      } catch (error) {
        // エラーメッセージをユーザーフレンドリーに変換
        let userMessage = "画像のアップロードに失敗しました";

        if (error instanceof Error) {
          // Cloudinary設定エラー
          if (
            error.message.includes("missing required environment variables")
          ) {
            userMessage =
              "サーバー設定エラー: Cloudinaryの環境変数が設定されていません";
          }
          // Cloudinaryアップロードエラー
          else if (error.message.includes("Cloudinary upload failed")) {
            userMessage = `アップロードエラー: ${error.message.replace("Cloudinary upload failed: ", "")}`;
          }
          // ファイルサイズエラー（Server Action制限）
          else if (error.message.includes("exceeded")) {
            userMessage =
              "画像ファイルが大きすぎます。より小さい画像を選択してください";
          }
          // その他のエラー
          else {
            userMessage = error.message;
          }
        }

        setError("thumbnail" as Path<T>, {
          type: "manual",
          message: userMessage,
        });
        return null;
      } finally {
        setIsFileUploading(false);
      }
    }

    return { ...data, thumbnail };
  };

  return { isFileUploading, uploadIfNeeded };
}
