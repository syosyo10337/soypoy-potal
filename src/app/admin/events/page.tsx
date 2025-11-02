"use client";

import { useList } from "@refinedev/core";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import {
  ListView,
  ListViewHeader,
} from "@/components/refine-ui/views/list-view";
import { Badge } from "@/components/shadcn/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import type { EventEntity } from "@/domain/entities";
import { PublicationStatus } from "@/domain/entities";

export default function EventsListPage() {
  const { data, isLoading } = useList<EventEntity>({
    resource: "events",
  });

  const events = data?.data ?? [];
  const total = data?.total ?? 0;

  return (
    <ListView>
      <ListViewHeader />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>タイトル</TableHead>
              <TableHead>日付</TableHead>
              <TableHead>種類</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  読み込み中...
                </TableCell>
              </TableRow>
            ) : events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  イベントがありません
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{event.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        event.publicationStatus === PublicationStatus.Published
                          ? "default"
                          : event.publicationStatus === PublicationStatus.Draft
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {event.publicationStatus === PublicationStatus.Published
                        ? "公開中"
                        : event.publicationStatus === PublicationStatus.Draft
                          ? "下書き"
                          : "アーカイブ"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <ShowButton recordItemId={event.id} />
                      <EditButton recordItemId={event.id} />
                      <DeleteButton recordItemId={event.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-muted-foreground">合計 {total} 件</div>
    </ListView>
  );
}
