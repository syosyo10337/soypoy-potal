import { Suspense } from "react";
import { EventList } from "./_components/EventList";
import { EventListSkeleton } from "./_components/EventListSkeleton";
import { EventPageHeader } from "./_components/EventPageHeader";
import { MonthNavigation } from "./_components/MonthNavigation";

export const revalidate = 6;

interface EventsPageProps {
  searchParams: Promise<{ month?: string }>;
}

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

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <EventPageHeader />
      <MonthNavigation year={year} month={month} />
      <Suspense fallback={<EventListSkeleton />}>
        <EventList />
      </Suspense>
    </div>
  );
}
