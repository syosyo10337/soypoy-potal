import {
  ListView,
  ListViewHeader,
} from "@/components/refine-ui/views/list-view";
import { AdminsTable } from "./_components/AdminsTable";

export default function AdminsListPage() {
  return (
    <ListView>
      <ListViewHeader />
      <AdminsTable />
    </ListView>
  );
}
