import type { EventEntity } from "@/domain/entities";
import type { EventRepository } from "@/domain/repositories/eventRepository";
import { DrizzleEventRepository } from "@/infrastructure/db/repositories/drizzleEventRepository";

/**
 * イベントサービス（読み取り専用）
 * ビジネスロジックを担当
 */
export class EventService {
  constructor(private repository: EventRepository) {}

  /**
   * 全てのイベントを取得
   */
  async getAllEvents(): Promise<EventEntity[]> {
    return await this.repository.list();
  }

  /**
   * IDによるイベント取得
   */
  async getEventById(id: string): Promise<EventEntity | undefined> {
    return await this.repository.findById(id);
  }
}

// デフォルトのサービスインスタンス（Notion実装を使用）
export const eventService = new EventService(new DrizzleEventRepository());
