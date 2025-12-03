import imageCompression from "browser-image-compression";

/**
 * 画像圧縮オプション
 */
export interface ImageCompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
}

interface ImageCompressionArgs {
  file: File;
  options?: ImageCompressionOptions;
}

/**
 * 画像を圧縮する関数
 * @param file - 圧縮するファイル
 * @param options - 圧縮オプション
 * @returns Promise<File> 圧縮されたファイル（圧縮失敗時は元ファイル）
 *
 * NOTE: imageCompression関数の戻り値型は`Promise<File>`として定義されているが、実際はFile|Blobとなる。
 *       アプリコード上での一貫性のために戻り値をFileに変換する
 * cf. https://github.com/Donaldcwl/browser-image-compression/blob/master/lib/index.js#L38
 */
export async function compressImage({
  file,
  options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  },
}: ImageCompressionArgs): Promise<File> {
  try {
    const compressed = (await imageCompression(file, options)) as File | Blob;
    if (compressed instanceof File) return compressed;

    if (compressed instanceof Blob) {
      return new File([compressed], file.name, {
        type: compressed.type,
        lastModified: file.lastModified,
      });
    }

    throw new Error("圧縮結果がFileまたはBlobではありません");
  } catch (error) {
    console.error("画像圧縮エラー:", error);
    // 圧縮に失敗した場合は元ファイルを返す
    return file;
  }
}
