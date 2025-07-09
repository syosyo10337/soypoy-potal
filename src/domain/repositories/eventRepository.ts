import type { EventEntity } from "../entities/event";

/**
 * イベントリポジトリインターフェース
 * データアクセスの抽象化（読み取り専用）
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
}
