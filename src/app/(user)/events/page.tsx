import { Suspense } from "react";
import { EventList } from "./_components/EventList";
import { EventListHeader } from "./_components/EventListHeader";
import { EventListSkeleton } from "./_components/EventListSkeleton";
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
  const monthParam = resolvedSearchParams.month;

  const now = new Date();
  const year = monthParam
    ? Number.parseInt(monthParam.split("-")[0] || String(now.getFullYear()), 10)
    : now.getFullYear();
  const month = monthParam
    ? Number.parseInt(
        monthParam.split("-")[1] || String(now.getMonth() + 1),
        10,
      )
    : now.getMonth() + 1;

  const dummyEvents = createDummyEvents(year, month);
  const dummyClosedDays = createDummyClosedDays(year, month);

  return (
    <div className="max-w-5xl mx-auto px-12 md:px-16 py-8 md:py-12">
      <EventListHeader />
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
