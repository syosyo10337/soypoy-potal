import type { ClosedDayEntity } from "@/domain/entities";
import { getMonthName } from "@/utils/date";
import { DateTile } from "./DateTile";

interface ClosedDaysAnnouncementProps {
  year: number;
  month: number;
  closedDays: ClosedDayEntity[];
}

export function ClosedDaysAnnouncement({
  year,
  month,
  closedDays,
}: ClosedDaysAnnouncementProps) {
  const monthName = getMonthName(year, month, "ja");

  return (
    <div className="mt-8 md:mt-12 text-soypoy-secondary">
      <h2 className="text-xl md:text-2xl font-bold mb-2 mx-auto">
        {monthName}の休業日
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
        {closedDays.map((closedDay) => (
          <DateTile key={closedDay.id} date={closedDay.date} />
        ))}
      </div>
    </div>
  );
}
