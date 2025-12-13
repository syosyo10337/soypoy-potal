import { DateTime } from "luxon";
import type { ClosedDayEntity } from "@/domain/entities/closedDay";
import type { ClosedDayRepository } from "@/domain/repositories/closedDayRepository";
import { dateTimeFromISO } from "@/utils/date";
import { db } from "../index";
import type { DrizzleClosedDay } from "../schema";
import { closedDays } from "../schema";

/**
 * Drizzleを使用したClosedDayRepository実装
 */
export class DrizzleClosedDayRepository implements ClosedDayRepository {
  /**
   * 指定月の休業日を取得
   */
  async listByMonth(year: number, month: number): Promise<ClosedDayEntity[]> {
    const drizzleClosedDays = await db.select().from(closedDays);

    return drizzleClosedDays
      .map((drizzleClosedDay) => {
        try {
          const dateISO =
            DateTime.fromJSDate(drizzleClosedDay.date, {
              zone: "utc",
            }).toISO() ?? "";
          const dt = dateTimeFromISO(dateISO);
          if (dt.isValid && dt.year === year && dt.month === month) {
            return this.toDomainEntity(drizzleClosedDay);
          }
          return null;
        } catch (error) {
          console.warn(
            `Invalid date string for closed day: ${drizzleClosedDay.date}`,
            error,
          );
          return null;
        }
      })
      .filter((entity): entity is ClosedDayEntity => entity !== null);
  }

  /**
   * Drizzleの休業日データをドメインエンティティに変換
   */
  private toDomainEntity(drizzleClosedDay: DrizzleClosedDay): ClosedDayEntity {
    return {
      id: drizzleClosedDay.id,
      date:
        DateTime.fromJSDate(drizzleClosedDay.date, { zone: "utc" }).toISO() ??
        "",
    };
  }
}
