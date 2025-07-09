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

/**
 * イベント作成用のデータ
 */
export interface CreateEventData {
  title: string;
  date: Date;
  description: string;
  imageUrl?: string;
}

/**
 * イベント更新用のデータ
 */
export interface UpdateEventData {
  title?: string;
  date?: Date;
  description?: string;
  imageUrl?: string;
}
