import { Suspense } from "react";
import { cn } from "@/utils/cn";
import { EventList } from "./_components/EventList";
import { EventListSkeleton } from "./_components/EventList/EventListSkeleton";
import { EventListTitle } from "./_components/EventListTitle";
import { MonthNavigation } from "./_components/MonthNavigation";
import { ScheduleAnnouncement } from "./_components/ScheduleAnnouncement";
import { createDummyClosedDays, createDummyEvents } from "./_dummies/event";
export const revalidate = 6;

interface EventsPageProps {
  searchParams: Promise<{ month: string }>;
}

//TODO: queryパラメータの設計する。
// defaultは今月 yearも分けた方がよさそう。
export default async function EventsPage({ searchParams }: EventsPageProps) {
  const resolvedSearchParams = await searchParams;
  const { year, month } = getYearAndMonthFromSearchParams(
    resolvedSearchParams.month,
  );

  const dummyEvents = createDummyEvents(year, month);
  const dummyClosedDays = createDummyClosedDays(year, month);

  return (
    <div className={cn("container mx-auto max-w-5xl", "px-12 md:px-16 py-8")}>
      <EventListTitle />
      <MonthNavigation year={year} month={month} />
      <Suspense fallback={<EventListSkeleton />}>
        <EventList events={dummyEvents} />
      </Suspense>
      <ScheduleAnnouncement
        year={year}
        month={month}
        events={dummyEvents}
        closedDays={dummyClosedDays}
      />
    </div>
  );
}

function getYearAndMonthFromSearchParams(monthParam: string | undefined) {
  if (!monthParam) {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  }
  const [yearStr, monthStr] = monthParam.split("-");
  return {
    year: Number.parseInt(yearStr, 10),
    month: Number.parseInt(monthStr, 10),
  };
}
