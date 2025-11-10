import type { ClosedDayEntity, EventEntity } from "@/domain/entities";
import { EventType } from "@/domain/entities/event/eventType";
import { PublicationStatus } from "@/domain/entities/event/publicationStatus";

export function createDummyEvents(year: number, month: number): EventEntity[] {
  const daysInMonth = new Date(year, month, 0).getDate();
  const events: EventEntity[] = [];

  for (let day = 1; day <= daysInMonth; day += 3) {
    const date = new Date(year, month - 1, day);
    const dateStr = date.toISOString().split("T")[0];
    const timeStr = `${String(19 + (day % 3)).padStart(2, "0")}:00`;
    const eventDate = `${dateStr}T${timeStr}:00.000Z`;

    events.push({
      id: `dummy-event-${day}`,
      publicationStatus: PublicationStatus.Published,
      title: `サンプルイベント ${day}日`,
      date: eventDate,
      description: `これは${day}日のサンプルイベントです。フリーカンパ制+1ドリンクです。`,
      thumbnail: `https://picsum.photos/400/300?random=${day}`,
      type: EventType.Music,
    });
  }

  return events;
}

export function createDummyClosedDays(
  year: number,
  month: number,
): ClosedDayEntity[] {
  const daysInMonth = new Date(year, month, 0).getDate();
  const closedDays: ClosedDayEntity[] = [];

  for (let day = 5; day <= daysInMonth; day += 7) {
    const date = new Date(year, month - 1, day);
    const dateStr = date.toISOString().split("T")[0];

    closedDays.push({
      id: `dummy-closed-day-${day}`,
      date: dateStr,
    });
  }

  return closedDays;
}
