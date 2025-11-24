import { Suspense } from "react";
import {
  ListView,
  ListViewHeader,
} from "@/components/refine-ui/views/list-view";
import { EventsCount, EventsTable, EventsTableLoading } from "./_components";

export default function EventsListPage() {
  return (
    <ListView>
      <ListViewHeader />
      <Suspense fallback={<EventsTableLoading />}>
        <EventsTable />
      </Suspense>
      <Suspense
        fallback={<div className="text-sm text-muted-foreground">...</div>}
      >
        <EventsCount />
      </Suspense>
    </ListView>
  );
}
