"use client";

import { useOne } from "@refinedev/core";
import Image from "next/image";
import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import { Badge } from "@/components/shadcn/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { PublicationStatus } from "@/domain/entities";

export default function EventShowPage({ params }: { params: { id: string } }) {
  // TODO: useShowが使えないか確認する;
  const { query: queryResult, result: event } = useOne({
    resource: "events",
    id: params.id,
  });

  if (queryResult?.isLoading) {
    return (
      <ShowView>
        <ShowViewHeader />
        <div className="text-center py-8">読み込み中...</div>
      </ShowView>
    );
  }

  if (!event) {
    return (
      <ShowView>
        <ShowViewHeader />
        <div className="text-center py-8">イベントが見つかりません</div>
      </ShowView>
    );
  }

  return (
    <ShowView>
      <ShowViewHeader />
      <Card>
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              ID
            </h3>
            <p className="text-sm">{event.id}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              日付
            </h3>
            <p className="text-sm">{event.date}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              種類
            </h3>
            <Badge variant="outline">{event.type}</Badge>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              公開ステータス
            </h3>
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
          </div>

          {event.description && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                説明
              </h3>
              <p className="text-sm whitespace-pre-wrap">{event.description}</p>
            </div>
          )}

          {event.thumbnail && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                サムネイル
              </h3>
              <Image
                src={event.thumbnail}
                alt={event.title}
                className="max-w-md rounded-md border"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </ShowView>
  );
}
