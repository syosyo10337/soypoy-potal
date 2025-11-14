import type { EventEntity } from "@/domain/entities";
import type { EventRepository } from "@/domain/repositories/eventRepository";
import { DrizzleEventRepository } from "@/infrastructure/db/repositories/drizzleEventRepository";

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
  async createEvent(event: EventEntity): Promise<EventEntity> {
    return await this.repository.create(event);
  }
  async updateEvent(
    id: string,
    event: Partial<Omit<EventEntity, "id">>,
  ): Promise<EventEntity> {
    return await this.repository.update(id, event);
  }
  async deleteEvent(id: string): Promise<void> {
    return await this.repository.delete(id);
  }
  async getEventsByMonth(year: number, month: number): Promise<EventEntity[]> {
    return await this.repository.listByMonth(year, month);
  }
}

export const eventService = new EventService(new DrizzleEventRepository());
