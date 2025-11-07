import type { ClosedDayEntity } from "@/domain/entities";
import { formatMonthDay, getMonthName } from "@/utils/date";

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
  if (closedDays.length === 0) {
    return null;
  }

  const monthName = getMonthName(year, month, "ja");

  return (
    <div className="mt-8 md:mt-12">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-white">
        {monthName}の休業日
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
        {closedDays.map((closedDay) => (
          <div
            key={closedDay.id}
            className="flex items-center justify-between border-b border-gray-600 pb-1"
          >
            <span className="text-sm md:text-base text-white">
              {formatMonthDay(closedDay.date)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
