"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils/cn";
import { getMonthName } from "@/utils/date";
import { NextMonthButton, PreviousMonthButton } from "./Button";

interface MonthNavigationProps {
  year: number;
  month: number;
}

// TODO: routerの実装をカスタムフックに分離する。
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

  const monthNumber = String(month).padStart(2, "0");
  const monthName = getMonthName(year, month);

  return (
    <div
      className={cn(
        "flex items-center justify-between",
        "md:gap-8 mb-8 md:mb-12",
        "text-soypoy-secondary font-display font-medium",
      )}
    >
      <PreviousMonthButton onClick={goToPreviousMonth} />

      <div className="flex flex-col items-center">
        <div className="text-base md:text-lg">{year}</div>
        <div className="text-[40px] md:text-[56px] leading-[26px]">
          {monthNumber}
        </div>
        <div className="text-sm md:text-lg">{monthName}</div>
      </div>

      <NextMonthButton onClick={goToNextMonth} />
    </div>
  );
}
