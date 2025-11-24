import { EventStatusBadge } from "@/components/admin/EventStatusBadge";
import { Badge } from "@/components/shadcn/badge";
import { TableCell, TableRow } from "@/components/shadcn/table";
import type { EventEntity } from "@/domain/entities";
import { EventActions } from "./EventActions";

interface EventTableRowProps {
  event: EventEntity;
}

/**
 * イベント一覧の1行
 *
 * Server Componentとして動作
 * Client Componentが必要な部分（アクションボタン）は分離
 */
export function EventTableRow({ event }: EventTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{event.title}</TableCell>
      <TableCell>{event.date}</TableCell>
      <TableCell>
        <Badge variant="outline">{event.type}</Badge>
      </TableCell>
      <TableCell>
        <EventStatusBadge variant={event.publicationStatus} />
      </TableCell>
      <TableCell className="text-right">
        <EventActions eventId={event.id} />
      </TableCell>
    </TableRow>
  );
}
