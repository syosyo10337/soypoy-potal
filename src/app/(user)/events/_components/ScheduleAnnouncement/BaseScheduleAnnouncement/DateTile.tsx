import { cn } from "@/utils/cn";
import { dateTimeFromISO, getDayOfWeekColorClass } from "@/utils/date";

interface DateTileProps {
  date: string;
}

export function DateTile({ date }: DateTileProps) {
  // TODO: refactor this not to use dateTimeFromISO here
  const dt = dateTimeFromISO(date);
  const day = dt.isValid ? dt.day.toString().padStart(2, "0") : "";
  const dayOfWeek = dt.isValid ? dt.setLocale("en").toFormat("EEE") : "";

  return (
    <div
      className={cn(
        "text-center font-display",
        "flex-shrink-0 min-w-[50px]",
        "m-2",
      )}
    >
      <div className="text-3xl md:text-4xl font-medium">{day}</div>
      <div
        className={cn(
          "text-lg md:text-2xl font-semibold",
          getDayOfWeekColorClass(date),
        )}
      >
        {dayOfWeek}
      </div>
    </div>
  );
}
