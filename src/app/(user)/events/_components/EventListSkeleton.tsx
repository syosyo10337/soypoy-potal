import { EventListItemSkeleton } from "./EventListItemSkeleton";

export function EventListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <EventListItemSkeleton key={index} />
      ))}
    </div>
  );
}
