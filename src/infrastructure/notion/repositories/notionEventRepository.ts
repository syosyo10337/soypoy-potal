import type {
  CreateEventData,
  EventEntity,
  UpdateEventData,
} from "@/domain/entities/event";
import type { EventRepository } from "@/domain/repositories/eventRepository";
import { getPage, queryDatabase } from "../client/queries";
import { NOTION_DB_KEYS } from "../config/constants";
import { EVENTS_SCHEMA, type NotionEvent } from "../config/schemas/eventSchema";

/**
 * Notion実装のEventRepository
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
   * イベントを作成
   * 注意: 現在の実装では読み取り専用のため、実装は後で追加
   */
  async create(_data: CreateEventData): Promise<EventEntity> {
    throw new Error("Create operation not implemented for Notion");
  }

  /**
   * イベントを更新
   * 注意: 現在の実装では読み取り専用のため、実装は後で追加
   */
  async update(
    _id: string,
    _data: UpdateEventData,
  ): Promise<EventEntity | null> {
    throw new Error("Update operation not implemented for Notion");
  }

  /**
   * イベントを削除
   * 注意: 現在の実装では読み取り専用のため、実装は後で追加
   */
  async delete(_id: string): Promise<boolean> {
    throw new Error("Delete operation not implemented for Notion");
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
