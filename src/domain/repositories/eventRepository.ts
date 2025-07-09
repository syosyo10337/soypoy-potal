import type {
  CreateEventData,
  EventEntity,
  UpdateEventData,
} from "../entities/event";

/**
 * イベントリポジトリインターフェース
 * データアクセスの抽象化
 */
export interface EventRepository {
  /**
   * 全てのイベントを取得
   */
  findAll(): Promise<EventEntity[]>;

  /**
   * IDによるイベント取得
   */
  findById(id: string): Promise<EventEntity | null>;

  /**
   * イベントを作成
   */
  create(data: CreateEventData): Promise<EventEntity>;

  /**
   * イベントを更新
   */
  update(id: string, data: UpdateEventData): Promise<EventEntity | null>;

  /**
   * イベントを削除
   */
  delete(id: string): Promise<boolean>;
}
