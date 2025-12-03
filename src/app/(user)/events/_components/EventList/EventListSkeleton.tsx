/** biome-ignore-all lint/suspicious/noArrayIndexKey: skeletonのため影響なし */
import { Separator } from "@/components/shadcn/separator";
import { Skeleton } from "@/components/shadcn/skeleton";

export function EventListSkeleton() {
  return (
    <div className="space-y-0">
      <Separator className="border-1" />
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <EventListItemSkeleton />
          <Separator className="border-1" />
        </div>
      ))}
    </div>
  );
}

function EventListItemSkeleton() {
  return (
    <div className="relative flex gap-4 py-3 md:py-6 font-display">
      <div className="flex flex-col flex-shrink-0 md:flex-row gap-3 basis-[30%]">
        <div>
          <Skeleton className="h-9 md:h-10 w-20 mb-1" />
          <Skeleton className="h-5 md:h-6 w-16" />
        </div>
        <Skeleton className="w-34 md:w-48 aspect-insta" />
      </div>

      <div className="flex flex-col justify-start basis-[70%]">
        <Skeleton className="h-5 md:h-7 w-full mb-2" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 md:h-5 w-32" />
          <Skeleton className="h-4 md:h-5 w-24" />
        </div>
      </div>
    </div>
  );
}
