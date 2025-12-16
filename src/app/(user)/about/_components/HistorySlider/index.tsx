"use client";

import { useRef } from "react";
import { cn } from "@/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HistoryItem from "./HistoryItem";

// ダミーデータ（後でAPIや定数ファイルから取得する想定）
const HISTORY_EVENTS = [
  {
    id: "1",
    yearDate: "2019.6",
    description:
      "ニューヨーク留学中のHibiki, Taito, Kotaroがオープンマイクを自主開催。チャイナタウンのカフェ・イベントスペースである「Silk Road Cafe」を拠点にダンサーやフォトグラファー、イラストレーターを集めて、yosemicとして活動を開始。",
  },
  {
    id: "2",
    yearDate: "2020.8",
    description:
      "東京・下北沢で活動開始。下北沢アリーナで東京発のオープンマイクを開催。東京のメンバーが集まる。",
  },
  {
    id: "3",
    yearDate: "2021.4",
    description:
      "下北沢にあるコワーキングスペースROBERTにて初のイベント『さらけだし』を開催。",
  },
  {
    id: "4",
    yearDate: "2022.4",
    description:
      "クラウドファンディングにより、パブリックハウス（PUB）『SOY-POY』を設立。総支援者202人、合計160万円の支援。オープニングパーティを開催。",
  },
];

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
        <button
          type="button"
          onClick={() => scroll("left")}
          className={cn(
            "w-[46px] h-[47px] md:w-[64px] md:h-[66px]",
            "rounded-full",
            "bg-soypoy-accent",
            "flex items-center justify-center",
            "transition-opacity hover:opacity-80",
          )}
          aria-label="前へ"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </button>

        {/* Title */}
        <h2
          className={cn(
            "font-anymale",
            "text-5xl md:text-7xl",
            "tracking-tight",
            "text-black text-center",
          )}
        >
          History
        </h2>

        {/* Right Navigation Button */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className={cn(
            "w-[46px] h-[47px] md:w-[64px] md:h-[66px]",
            "rounded-full",
            "bg-soypoy-accent",
            "flex items-center justify-center",
            "transition-opacity hover:opacity-80",
          )}
          aria-label="次へ"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </button>
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

