import type { EventEntity } from "@/domain/entities/event";
import type { EventRepository } from "@/domain/repositories/eventRepository";
import { getPage, queryDatabase } from "../client/queries";
import { NOTION_DB_KEYS } from "../config/constants";
import { type NotionEvent, eventSchema } from "../config/schemas/eventSchema";
import { UrlSchema } from "../config/schemas/urlSchema";

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
        eventSchema,
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
  async findById(id: string): Promise<EventEntity | undefined> {
    try {
      const notionEvent = await getPage<NotionEvent>(id, eventSchema);
      return notionEvent ? this.toDomainEntity(notionEvent) : undefined;
    } catch (error) {
      console.error("Error fetching event:", error);
      throw new Error("Failed to fetch event");
    }
  }

  /**
   * Notionのイベントデータをドメインエンティティに変換
   *
   * TODO: エラーハンドルちゃんとする
   */
  private toDomainEntity(notionEvent: NotionEvent): EventEntity {
    try {
      const imageUrl = UrlSchema.parse(notionEvent.imageUrl);

      return {
        id: notionEvent.id,
        publicationStatus: notionEvent.publicationStatus,
        title: notionEvent.title,
        date: notionEvent.date,
        description: notionEvent.description,
        imageUrl: imageUrl,
      };
    } catch (error) {
      console.error("Error parsing imageUrl:", error);
      throw new Error("Failed to parse imageUrl");
    }
  }
}
