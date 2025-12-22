"use client";

import { useRef } from "react";
import { CircularNavigationButton } from "@/components/CircularNavigationButton";
import { cn } from "@/utils/cn";
import SectionTitle from "../SectionTitle";
import { HISTORY_EVENTS } from "./HISTORY_EVENTS";
import HistoryItem from "./HistoryItem";

export default function HistorySlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 315; // HistoryItemの幅
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 md:py-20">
      {/* Section Title with Navigation */}
      <div className="flex items-center justify-center gap-4 md:gap-8 mb-8 md:mb-12">
        {/* Left Navigation Button */}
        <CircularNavigationButton
          onClick={() => scroll("left")}
          direction="prev"
          ariaLabel="前へ"
          size="md"
        />

        {/* Title */}
        <SectionTitle>History</SectionTitle>

        {/* Right Navigation Button */}
        <CircularNavigationButton
          onClick={() => scroll("right")}
          direction="next"
          ariaLabel="次へ"
          size="md"
        />
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-11 md:w-[358px] bg-gradient-to-r from-soypoy-main to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-11 md:w-[358px] bg-gradient-to-l from-soypoy-main to-transparent z-10 pointer-events-none" />

        {/* Scrollable Area */}
        <div
          ref={scrollContainerRef}
          className={cn(
            "flex",
            "overflow-x-auto",
            "px-11 md:px-[262px]",
            "pb-4",
            "snap-x snap-mandatory",
            "scrollbar-hide",
            "[&::-webkit-scrollbar]:hidden",
            "[-ms-overflow-style:none]",
            "[scrollbar-width:none]",
          )}
        >
          {HISTORY_EVENTS.map((event) => (
            <HistoryItem
              key={event.id}
              yearDate={event.yearDate}
              description={event.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
