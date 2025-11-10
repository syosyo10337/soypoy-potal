import Image from "next/image";
import NoImage from "@/assets/no-image.png";
import type { EventEntity } from "@/domain/entities";
import { cn } from "@/utils/cn";
import { formatDayOfWeek, formatMonthDayOnly, formatTime } from "@/utils/date";
import { truncate } from "@/utils/text";
import { PickUpLabel } from "./PickUpLabel";

interface EventListItemProps {
  event: EventEntity & { isPickUp?: boolean };
}

export function EventListItem({ event }: EventListItemProps) {
  //TODO: 価格のロジックを修正する。
  const priceOrCondition =
    event.description?.includes("フリーカンパ") ||
    event.description?.includes("フリー")
      ? "フリーカンパ制+1ドリンク"
      : event.description?.match(/¥[\d,]+/)
        ? event.description.match(/¥[\d,]+/)?.[0]
        : null;

  return (
    <div
      className={cn("relative flex", "gap-4", "py-3 md:py-6", "font-display")}
    >
      <div
        className={cn(
          "flex flex-col flex-shrink-0 md:flex-row gap-3",
          "basis-[30%]",
        )}
      >
        <div>
          <div className="text-3xl md:text-4xl font-medium">
            {formatMonthDayOnly(event.date)}
          </div>
          <div className="text-base/2 md:text-lg font-semibold">
            {formatDayOfWeek(event.date)}
          </div>
        </div>
        <Image
          src={event.thumbnail ?? NoImage}
          alt={event.title}
          className="w-34 md:w-48 aspect-[4/5] object-cover"
          width={400}
          height={500}
        />
      </div>

      <div className={cn("flex flex-col justify-start", "basis-[70%]")}>
        <h3 className="text-base md:text-2xl font-semibold mb-2">
          {truncate(event.title, 50)}
        </h3>

        <div className="text-soypoy-muted font-display text-sm md:text-base">
          {priceOrCondition && <p>{priceOrCondition}</p>}
          <p>{`START: ${formatTime(event.date)}`}</p>
        </div>
      </div>
      {event.isPickUp && <PickUpLabel />}
    </div>
  );
}
