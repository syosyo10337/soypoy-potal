"use client";
import { useRef } from "react";
import { useRowLayout } from "../useRowLayout";
import { DateTile } from "./DateTile";

interface ScheduleAnnouncementProps {
  title: string;
  dates: string[];
  description?: string;
}

/**
 * NOTE: 隅抜きのborderを作成するため、itemの数や行数を計算して適切なSeparatorを表示する。
 */
export function BaseScheduleAnnouncement({
  title,
  dates,
  description,
}: ScheduleAnnouncementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { itemPositions, hasMultipleRows } = useRowLayout(containerRef);

  return (
    <div className="mt-8 md:mt-12 text-soypoy-secondary">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-center">
        {title}
      </h2>
      {description && (
        <p className="text-sm md:text-base mb-4">{description}</p>
      )}
      <div ref={containerRef} className="flex flex-wrap gap-2">
        {dates.map((item, index) => {
          const position = itemPositions[index];
          const showVerticalSeparator = position && !position.isLastInRow;
          const showHorizontalSeparator =
            position && !position.isInLastRow && hasMultipleRows;

          return (
            <div
              key={item}
              data-calendar-item
              className="relative flex shrink-0 w-[calc((100%-32px)/4)]"
            >
              <DateTile date={item} />
              {/* Vertical separator */}
              {showVerticalSeparator && (
                <div className="absolute top-0 bottom-0 flex items-center -right-1">
                  <div className="w-[1px] h-[calc(100%-0.5rem)] bg-soypoy-secondary" />
                </div>
              )}
              {/* Horizontal separator */}
              {showHorizontalSeparator && (
                <div className="absolute left-0 right-0 flex justify-center -bottom-0">
                  <div className="w-[calc(100%-0.5rem)] h-[1px] bg-soypoy-secondary" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
