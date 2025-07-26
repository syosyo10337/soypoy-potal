import type { EventEntity } from "@/domain/entities/event";
import type { EventRepository } from "@/domain/repositories/eventRepository";
import { NotionEventRepository } from "@/infrastructure/notion/repositories/notionEventRepository";

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
    return await this.repository.findAll();
  }

  /**
   * IDによるイベント取得
   */
  async getEventById(id: string): Promise<EventEntity | undefined> {
    return await this.repository.findById(id);
  }
}

// デフォルトのサービスインスタンス（Notion実装を使用）
export const eventService = new EventService(new NotionEventRepository());
