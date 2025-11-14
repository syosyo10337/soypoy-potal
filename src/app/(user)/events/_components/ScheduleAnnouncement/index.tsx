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

  const weekendDates = getWeekendDatesInMonth(year, month).map((wd) => wd.date);
  const eventDates = events.map((event) => event.date.split("T")[0]);
  const closedDayDates = closedDays.map((cd) => cd.date);

  const regularHoursDates = weekendDates.filter(
    (weekendDate) =>
      !eventDates.includes(weekendDate) &&
      !closedDayDates.includes(weekendDate),
  );

  return (
    <div className="font-semibold">
      <BaseScheduleAnnouncement
        title={`${monthName}の通常営業日`}
        dates={regularHoursDates}
        description="イベントのない金・土・日は、ゆったりお酒を楽しめるバー営業となっております"
      />
      <BaseScheduleAnnouncement
        title={`${monthName}の休業日`}
        dates={closedDayDates}
      />
    </div>
  );
}
