"use client";

import { ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { cn } from "@/utils/cn";
import { compressImage, type ImageCompressionOptions } from "./compression";

import type { ImageChangeHandler, ImageValue } from "./type";

export interface ImageUploaderProps {
  /**
   * 現在の値（File or URLstring）
   */
  value?: ImageValue;

  /**
   * 値変更時のコールバック
   */
  onChange?: ImageChangeHandler;

  /**
   * 追加のクラス名
   */
  className?: string;

  /**
   * アスペクト比（デフォルト: 16:9）
   */
  aspectRatio?: string;

  /**
   * 許可するファイル形式（デフォルト: png, jpeg, svg）
   */
  acceptedFileTypes?: string;

  /**
   * 画像圧縮オプション
   */
  compressionOptions?: ImageCompressionOptions;
}

/**
 * v0で生成したコードをベースに、react-hook-formとの互換性を保つように修正したコード
 * previewやデータのやりとりについては、自前での実装
 * 画像圧縮機能を追加
 */
export function ImageUploader({
  value,
  onChange,
  className,
  aspectRatio = "aspect-[16/9]",
  acceptedFileTypes = "image/png,image/jpeg",
  compressionOptions,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [isCompressing, setIsCompressing] = useState(false);

  // 値が変更された時の処理
  useEffect(() => {
    if (!value || value === undefined) {
      setPreview(undefined);
      return;
    }

    if (typeof value === "string") {
      setPreview(value);
      return;
    }

    // Fileオブジェクトの処理
    if (
      typeof value === "object" &&
      value &&
      "name" in value &&
      "size" in value
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(value as File);
    }
  }, [value]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);

    try {
      // // 画像圧縮を実行
      const compressedFile = await compressImage({
        file,
        ...(compressionOptions && { options: compressionOptions }),
      });

      onChange?.(compressedFile);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null); // react-hook-formとの互換性のためnullを使用
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    if (isCompressing) return;
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("relative", aspectRatio, className)}>
      <button
        type="button"
        className={cn(
          "w-full h-full border-2 border-dashed border-muted-foreground/25 rounded-lg overflow-hidden",
          "transition-colors hover:border-muted-foreground/50",
          isCompressing ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        )}
        onClick={openFileDialog}
      >
        {preview ? (
          <div className="relative w-full h-full">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* オーバーレイ */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="opacity-0 hover:opacity-100 transition-opacity">
                <Upload className="h-8 w-8 text-white drop-shadow-lg" />
              </div>
            </div>

            {/* 削除ボタン */}
            {!isCompressing && (
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-lg"
                onClick={handleRemove}
                aria-label="画像を削除"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <ImageUploaderPlaceholder />
        )}
      </button>

      <Input
        ref={fileInputRef}
        type="file"
        className="sr-only"
        accept={acceptedFileTypes}
        onChange={(e) => {
          void handleFileSelect(e);
        }}
        disabled={isCompressing}
      />
    </div>
  );
}

function ImageUploaderPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
      <p className="text-sm font-medium text-muted-foreground mb-1">
        クリックして画像をアップロード
      </p>
      <p className="text-xs text-muted-foreground">PNG, JPEG (最大 5MB)</p>
    </div>
  );
}
