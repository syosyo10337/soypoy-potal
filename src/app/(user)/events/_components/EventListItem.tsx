import Image from "next/image";
import NoImage from "@/assets/no-image.png";
import type { EventEntity } from "@/domain/entities";
import { formatMonthDay, formatTime } from "@/utils/date";
import { truncate } from "@/utils/text";
import { PickUpLabel } from "./PickUpLabel";

interface EventListItemProps {
  event: EventEntity;
  isPickUp?: boolean;
}

export function EventListItem({ event, isPickUp = false }: EventListItemProps) {
  const imageUrl = event.thumbnail ?? NoImage;
  const truncatedTitle = truncate(event.title, 50);
  const dateStr = formatMonthDay(event.date);
  const timeStr = formatTime(event.date);

  const priceOrCondition =
    event.description?.includes("フリーカンパ") ||
    event.description?.includes("フリー")
      ? "フリーカンパ制+1ドリンク"
      : event.description?.match(/¥[\d,]+/)
        ? event.description.match(/¥[\d,]+/)?.[0]
        : null;

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 py-4 md:py-6">
      <div className="flex-shrink-0">
        <div className="text-sm md:text-base font-semibold text-white mb-1">
          {dateStr}
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="relative w-full md:w-48 lg:w-64 h-48 md:h-40 lg:h-48 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={event.title}
            className="w-full h-full object-cover rounded"
            width={400}
            height={300}
          />
          {isPickUp && <PickUpLabel />}
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white">
            {truncatedTitle}
          </h3>

          {priceOrCondition && (
            <p className="text-sm md:text-base text-gray-300 mb-2">
              {priceOrCondition}
            </p>
          )}

          {timeStr !== "時刻未定" && (
            <p className="text-sm md:text-base text-gray-400">
              {timeStr}~START
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
