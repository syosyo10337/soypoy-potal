"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getMonthName } from "@/utils/date";

interface MonthNavigationProps {
  year: number;
  month: number;
}

export function MonthNavigation({ year, month }: MonthNavigationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateMonth = (delta: number) => {
    const newDate = new Date(year, month - 1 + delta, 1);
    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth() + 1;
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", `${newYear}-${String(newMonth).padStart(2, "0")}`);
    router.push(`/events?${params.toString()}`);
  };

  const goToPreviousMonth = () => navigateMonth(-1);
  const goToNextMonth = () => navigateMonth(1);

  const monthName = getMonthName(year, month, "en");

  return (
    <div className="flex items-center justify-center gap-4 md:gap-8 mb-8 md:mb-12">
      <button
        onClick={goToPreviousMonth}
        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
        aria-label="前月へ"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="flex flex-col items-center">
        <div className="text-2xl md:text-3xl font-bold text-white">{year}</div>
        <div className="text-4xl md:text-6xl font-bold text-white">
          {String(month).padStart(2, "0")}
        </div>
        <div className="text-lg md:text-xl text-white">{monthName}</div>
      </div>

      <button
        onClick={goToNextMonth}
        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
        aria-label="次月へ"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
