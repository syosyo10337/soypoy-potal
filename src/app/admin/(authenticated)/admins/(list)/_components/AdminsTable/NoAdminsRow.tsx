import { TableCell, TableRow } from "@/components/shadcn/table";

export function NoAdminsRow() {
  return (
    <TableRow>
      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
        管理者がいません
      </TableCell>
    </TableRow>
  );
}
