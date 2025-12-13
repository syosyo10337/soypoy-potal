import { and, sql } from "drizzle-orm";
import type { ClosedDayEntity } from "@/domain/entities/closedDay";
import type { ClosedDayRepository } from "@/domain/repositories/closedDayRepository";
import { dateToIsoFull } from "@/utils/date";
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
    const drizzleClosedDays = await db
      .select()
      .from(closedDays)
      .where(
        and(
          sql`EXTRACT(YEAR FROM ${closedDays.date}) = ${year}`,
          sql`EXTRACT(MONTH FROM ${closedDays.date}) = ${month}`,
        ),
      );

    return drizzleClosedDays.map(this.toDomainEntity);
  }

  /**
   * Drizzleの休業日データをドメインエンティティに変換
   */
  private toDomainEntity(drizzleClosedDay: DrizzleClosedDay): ClosedDayEntity {
    return {
      id: drizzleClosedDay.id,
      date: dateToIsoFull(drizzleClosedDay.date),
    };
  }
}
