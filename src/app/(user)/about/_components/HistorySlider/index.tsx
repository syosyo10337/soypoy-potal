"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import SectionTitle from "../SectionTitle";
import { HISTORY_EVENTS } from "./HISTORY_EVENTS";
import HistoryIndicator from "./HistoryIndicator";
import HistoryItem from "./HistoryItem";
import {
  NextHistoryButton,
  PreviousHistoryButton,
} from "./HistoryNavigationButton";

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

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const itemWidth = getItemWidth();
      const targetScrollLeft = index * itemWidth;
      scrollContainerRef.current.scrollTo({
        left: targetScrollLeft,
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
    <section className="py-12 md:py-20">
      <div className="flex items-center justify-between px-4 md:px-8 mb-8 md:mb-12">
        <PreviousHistoryButton onClick={() => scroll("left")} />
        <SectionTitle>History</SectionTitle>
        <NextHistoryButton onClick={() => scroll("right")} />
      </div>

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-soypoy-main to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-soypoy-main to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollContainerRef}
          className={cn(
            "flex",
            "overflow-x-auto",
            "px-4 md:px-8",
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
        onIndicatorClick={scrollToIndex}
      />
    </section>
  );
}
