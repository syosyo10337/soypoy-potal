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

    // 環境判定用 (Cloudinaryフォルダ振り分けに使用)
    // production: 本番環境
    // preview: プレビュー環境 (Deploy Preview)
    // development: 開発環境 (ローカル)
    APP_ENV?: "production" | "preview" | "development";
  }
}
