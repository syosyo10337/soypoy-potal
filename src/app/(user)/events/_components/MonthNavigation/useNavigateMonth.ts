"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useNavigateMonth(currentYear: number, currentMonth: number) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateMonth = (delta: number) => {
    const newDate = new Date(currentYear, currentMonth - 1 + delta, 1);
    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth() + 1;
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", `${newYear}-${String(newMonth).padStart(2, "0")}`);
    router.push(`/events?${params.toString()}`);
  };

  return navigateMonth;
}
