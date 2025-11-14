/**
 * 休業日エンティティ
 * ドメイン層の休業日を表す
 */
export interface ClosedDayEntity {
  id: string;
  /**
   * 日付文字列
   * YYYY-MM-DD形式（ISO8601の日付部分のみ）
   * 例: "2025-08-16"
   */
  date: string;
}
