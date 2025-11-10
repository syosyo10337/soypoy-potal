/** biome-ignore-all lint/suspicious/noArrayIndexKey: skeletonのため影響なし */
import { Skeleton } from "@/components/shadcn/skeleton";

export function EventListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <EventListItemSkeleton key={i} />
      ))}
    </div>
  );
}

// TODO:実際のリストをかたどる
function EventListItemSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 py-4 md:py-6">
      <div className="flex-shrink-0">
        <Skeleton className="h-5 w-20 mb-1" />
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6">
        <Skeleton className="w-full md:w-48 lg:w-64 h-48 md:h-40 lg:h-48 flex-shrink-0" />

        <div className="flex-1 flex flex-col gap-2">
          <Skeleton className="h-6 md:h-7 w-full" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}
