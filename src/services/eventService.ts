import { nanoid } from "nanoid";
import { type EventEntity, PublicationStatus } from "@/domain/entities";
import type { EventRepository } from "@/domain/repositories/eventRepository";

/**
 * イベントサービス
 * ビジネスロジックを担当
 */
export class EventService {
  constructor(private repository: EventRepository) {}
  async getAllEvents(): Promise<EventEntity[]> {
    return await this.repository.list();
  }
  async getEventById(id: string): Promise<EventEntity | undefined> {
    return await this.repository.findById(id);
  }
  async createEvent(
    input: Omit<EventEntity, "id" | "publicationStatus">,
  ): Promise<EventEntity> {
    return await this.repository.create({
      id: nanoid(),
      publicationStatus: PublicationStatus.Draft,
      ...input,
    });
  }
  async updateEvent(
    id: string,
    input: Partial<Omit<EventEntity, "id">>,
  ): Promise<EventEntity> {
    return await this.repository.update(id, input);
  }
  async deleteEvent(id: string): Promise<void> {
    return await this.repository.delete(id);
  }
  async getEventsByMonth(year: number, month: number): Promise<EventEntity[]> {
    return await this.repository.listByMonth(year, month);
  }
}
