import type { ClosedDayEntity, EventEntity } from "@/domain/entities";
import { getMonthName, getWeekendDatesInMonth } from "@/utils/date";
import { DateTile } from "./DateTile";

interface RegularHoursAnnouncementProps {
  year: number;
  month: number;
  events: EventEntity[];
  closedDays: ClosedDayEntity[];
}

export function RegularHoursAnnouncement({
  year,
  month,
  events,
  closedDays,
}: RegularHoursAnnouncementProps) {
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

  const monthName = getMonthName(year, month, "ja");

  return (
    <div className="mt-8 md:mt-12 text-soypoy-secondary">
      <h2 className="text-xl md:text-2xl font-bold mb-2 mx-auto">
        {monthName}の通常営業日
      </h2>
      <p className="text-sm md:text-base mb-4">
        イベントのない金・土・日は、ゆったりお酒を楽しめるバー営業となっております
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
        {regularHoursDates.map((date) => (
          <DateTile key={date.date} date={date.date} />
        ))}
      </div>
    </div>
  );
}
