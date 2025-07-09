/**
 * イベントエンティティ
 * ドメイン層のイベントを表す
 */
export interface EventEntity {
  id: string;
  title: string;
  date: Date;
  description: string;
  imageUrl: string;
}
