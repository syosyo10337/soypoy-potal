import {
  ListView,
  ListViewHeader,
} from "@/components/refine-ui/views/list-view";
import { EventsTable } from "./_components";

export default function EventsListPage() {
  return (
    <ListView>
      <ListViewHeader />
      <EventsTable />
    </ListView>
  );
}
