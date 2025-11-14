import { cn } from "@/utils/cn";

interface DateTileProps {
  day: string;
  dayOfWeek: string;
  colorClass: string;
}

export function DateTile({ day, dayOfWeek, colorClass }: DateTileProps) {
  return (
    <div
      className={cn(
        "text-center font-display",
        "flex-shrink-0 min-w-[50px]",
        "m-2",
      )}
    >
      <div className="text-3xl md:text-4xl font-medium">{day}</div>
      <div className={cn("text-lg md:text-2xl font-semibold", colorClass)}>
        {dayOfWeek}
      </div>
    </div>
  );
}
