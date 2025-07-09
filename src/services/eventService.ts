import type {
  CreateEventData,
  EventEntity,
  UpdateEventData,
} from "@/domain/entities/event";
import type { EventRepository } from "@/domain/repositories/eventRepository";
import { NotionEventRepository } from "@/infrastructure/notion/repositories/notionEventRepository";

/**
 * イベントサービス
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
  async getEventById(id: string): Promise<EventEntity | null> {
    return await this.repository.findById(id);
  }

  /**
   * イベントを作成
   */
  async createEvent(data: CreateEventData): Promise<EventEntity> {
    return await this.repository.create(data);
  }

  /**
   * イベントを更新
   */
  async updateEvent(
    id: string,
    data: UpdateEventData,
  ): Promise<EventEntity | null> {
    return await this.repository.update(id, data);
  }

  /**
   * イベントを削除
   */
  async deleteEvent(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}

// デフォルトのサービスインスタンス（Notion実装を使用）
export const eventService = new EventService(new NotionEventRepository());
