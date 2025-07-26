/**
 * イベントエンティティ
 * ドメイン層のイベントを表す
 * TODO: ステイタスのenum化
 */
export interface EventEntity {
  id: string;
  publicationStatus: string;
  title: string;
  /**
   * 日時文字列
   * 時刻がある時はISO8601形式、ない時はYYYY-MM-DD形式
   */
  date: string;
  description: string;
  /**
   * 画像URL
   * 空文字列の場合は画像がないことを表す
   */
  imageUrl: string | "";
}
