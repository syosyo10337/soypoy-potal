import { DateTime } from "luxon";

/**
 * イベントエンティティ
 * ドメイン層のイベントを表す
 */
export interface EventEntity {
  id: string;
  publicationStatus: string;
  title: string;
  date: DateTime;
  description: string;
  imageUrl: string;
}
