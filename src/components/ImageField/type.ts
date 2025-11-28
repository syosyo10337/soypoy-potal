/**
 * ImageUploaderコンポーネント専用の型定義
 * Zodスキーマから独立した、UIコンポーネントの責務に特化した型
 */

/**
 * ImageUploaderが扱う値の型
 * 一貫性のためFileのみを許可（圧縮処理でBlobはFileに変換される）
 */
export type ImageValue = File | string | null | undefined;

/**
 * ImageUploaderのコールバック型
 */
export type ImageChangeHandler = (value: ImageValue) => void;
