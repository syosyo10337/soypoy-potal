import type { EventEntity } from "@/domain/entities/event";
import type { EventRepository } from "@/domain/repositories/eventRepository";
import { getPage, queryDatabase } from "../client/queries";
import { NOTION_DB_KEYS } from "../config/constants";
import { EVENTS_SCHEMA, type NotionEvent } from "../config/schemas/eventSchema";

/**
 * Notion実装のEventRepository（読み取り専用）
 */
export class NotionEventRepository implements EventRepository {
  /**
   * 全てのイベントを取得
   */
  async findAll(): Promise<EventEntity[]> {
    try {
      const notionEvents = await queryDatabase<NotionEvent>(
        NOTION_DB_KEYS.events,
        EVENTS_SCHEMA,
        {
          sorts: [{ property: "Date", direction: "ascending" }],
        },
      );

      return notionEvents.map(this.toDomainEntity);
    } catch (error) {
      console.error("Error fetching events:", error);
      throw new Error("Failed to fetch events");
    }
  }

  /**
   * IDによるイベント取得
   */
  async findById(id: string): Promise<EventEntity | null> {
    try {
      const notionEvent = await getPage<NotionEvent>(id, EVENTS_SCHEMA);
      return notionEvent ? this.toDomainEntity(notionEvent) : null;
    } catch (error) {
      console.error("Error fetching event:", error);
      throw new Error("Failed to fetch event");
    }
  }

  /**
   * Notionのイベントデータをドメインエンティティに変換
   */
  private toDomainEntity(notionEvent: NotionEvent): EventEntity {
    return {
      id: notionEvent.id.toString(),
      title: notionEvent.title,
      date: new Date(notionEvent.date),
      description: notionEvent.description,
      imageUrl: notionEvent.imageUrl,
    };
  }
}
