"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CircularNavigationButton } from "@/components/CircularNavigationButton";
import { cn } from "@/utils/cn";
import SectionTitle from "../SectionTitle";
import { HISTORY_EVENTS } from "./HISTORY_EVENTS";
import HistoryIndicator from "./HistoryIndicator";
import HistoryItem from "./HistoryItem";

export default function HistorySlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getItemWidth = useCallback(() => {
    // Mobile: 287px, Desktop: 315px
    return window.innerWidth >= 768 ? 315 : 287;
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = getItemWidth();
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  // Track active item based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = getItemWidth();
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(index, HISTORY_EVENTS.length - 1));
    };

    container.addEventListener("scroll", handleScroll);

    // Handle window resize to recalculate on breakpoint changes
    const handleResize = () => {
      handleScroll();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [getItemWidth]);

  return (
    <section className="py-12 md:py-20 relative">
      {/* Navigation Buttons - Absolute positioned */}
      <div className="absolute left-[11px] md:left-[262px] top-12 md:top-20 z-20">
        <CircularNavigationButton
          onClick={() => scroll("left")}
          direction="prev"
          ariaLabel="前へ"
          size="md"
        />
      </div>

      <div className="absolute right-[11px] md:right-[262px] top-12 md:top-20 z-20">
        <CircularNavigationButton
          onClick={() => scroll("right")}
          direction="next"
          ariaLabel="次へ"
          size="md"
        />
      </div>

      {/* Section Title - Centered */}
      <div className="flex items-center justify-center mb-8 md:mb-12">
        <SectionTitle>History</SectionTitle>
      </div>

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-11 md:w-[358px] bg-gradient-to-r from-soypoy-main to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-11 md:w-[358px] bg-gradient-to-l from-soypoy-main to-transparent z-10 pointer-events-none" />

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

      <HistoryIndicator
        total={HISTORY_EVENTS.length}
        activeIndex={activeIndex}
      />
    </section>
  );
}
