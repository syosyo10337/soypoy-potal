/**
 * Cloudinary環境変数の型定義
 */
declare namespace NodeJS {
  interface ProcessEnv {
    // Server-side (cloudinary package)
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;

    // Client-side (next-cloudinary package)
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
  }
}
