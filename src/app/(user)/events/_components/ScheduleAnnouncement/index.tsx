import type { ClosedDayEntity, EventEntity } from "@/domain/entities";
import { getMonthName, getWeekendDatesInMonth } from "@/utils/date";
import { BaseScheduleAnnouncement } from "./BaseScheduleAnnouncement";

interface ScheduleAnnouncementProps {
  year: number;
  month: number;
  events: EventEntity[];
  closedDays: ClosedDayEntity[];
}

export function ScheduleAnnouncement({
  year,
  month,
  events,
  closedDays,
}: ScheduleAnnouncementProps) {
  const monthName = getMonthName(year, month, "ja");

  const weekendDates = getWeekendDatesInMonth(year, month);
  const eventDates = new Set(
    events.map((event) => {
      const dateStr = event.date.split("T")[0];
      return dateStr;
    }),
  );
  const closedDayDates = new Set(closedDays.map((cd) => cd.date));

  const regularHoursDates = weekendDates.filter(
    (weekend) =>
      !eventDates.has(weekend.date) && !closedDayDates.has(weekend.date),
  );

  const regularHoursDatesArray = regularHoursDates.map((d) => d.date);
  const closedDaysDatesArray = closedDays.map((cd) => cd.date);

  return (
    <div className="font-semibold">
      <BaseScheduleAnnouncement
        title={`${monthName}の通常営業日`}
        dates={regularHoursDatesArray}
        description="イベントのない金・土・日は、ゆったりお酒を楽しめるバー営業となっております"
      />
      <BaseScheduleAnnouncement
        title={`${monthName}の休業日`}
        dates={closedDaysDatesArray}
      />
    </div>
  );
}
