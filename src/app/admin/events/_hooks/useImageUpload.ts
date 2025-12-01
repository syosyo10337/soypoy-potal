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
        setError("thumbnail" as Path<T>, {
          type: "manual",
          message:
            error instanceof Error
              ? error.message
              : "画像のアップロードに失敗しました",
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
