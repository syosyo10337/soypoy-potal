import { formatMonthDay } from "@/utils/date";

interface DateTileProps {
  date: string;
}

export function DateTile({ date }: DateTileProps) {
  return (
    <div className="flex items-center justify-between border-b border-soypoy-muted pb-1">
      <span className="text-sm md:text-base">{formatMonthDay(date)}</span>
    </div>
  );
}
