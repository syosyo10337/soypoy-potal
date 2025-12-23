"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseHistorySliderOptions {
  totalItems: number;
  mobileItemWidth?: number;
  desktopItemWidth?: number;
  breakpoint?: number;
}

export function useHistorySlider({
  totalItems,
  mobileItemWidth = 287,
  desktopItemWidth = 315,
  breakpoint = 768,
}: UseHistorySliderOptions) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sidePadding, setSidePadding] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const getItemWidth = useCallback(() => {
    return window.innerWidth >= breakpoint ? desktopItemWidth : mobileItemWidth;
  }, [breakpoint, desktopItemWidth, mobileItemWidth]);

  const calculateSidePadding = useCallback(() => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const itemWidth = getItemWidth();
      const padding = (containerWidth - itemWidth) / 2;
      setSidePadding(Math.max(0, padding));
    }
  }, [getItemWidth]);

  const scroll = useCallback(
    (direction: "left" | "right") => {
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
    },
    [getItemWidth],
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      if (scrollContainerRef.current) {
        const itemWidth = getItemWidth();
        const targetScrollLeft = index * itemWidth;
        scrollContainerRef.current.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth",
        });
      }
    },
    [getItemWidth],
  );

  useEffect(() => {
    calculateSidePadding();
    setIsReady(true);
    window.addEventListener("resize", calculateSidePadding);
    return () => {
      window.removeEventListener("resize", calculateSidePadding);
    };
  }, [calculateSidePadding]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = getItemWidth();
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(Math.max(0, index), totalItems - 1));
    };

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [getItemWidth, totalItems]);

  return {
    scrollContainerRef,
    activeIndex,
    sidePadding,
    isReady,
    scroll,
    scrollToIndex,
  };
}
