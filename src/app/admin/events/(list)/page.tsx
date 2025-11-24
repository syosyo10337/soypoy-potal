import { Suspense } from "react";
import {
  ListView,
  ListViewHeader,
} from "@/components/refine-ui/views/list-view";
import { EventsTable, EventsTableLoading } from "./_components";

export const dynamic = "force-dynamic";

export default function EventsListPage() {
  return (
    <ListView>
      <ListViewHeader />
      <Suspense fallback={<EventsTableLoading />}>
        <EventsTable />
      </Suspense>
    </ListView>
  );
}
