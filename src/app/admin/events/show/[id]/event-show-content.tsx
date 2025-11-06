"use client";

import { useShow } from "@refinedev/core";
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
import { type EventEntity, PublicationStatus } from "@/domain/entities";

type EventShowContentProps = {
  eventId: string;
};

export function EventShowContent({ eventId }: EventShowContentProps) {
  const { query, result } = useShow<EventEntity>({
    resource: "events",
    id: eventId,
  });

  console.log("query", query);
  console.log("result", result);

  if (query?.isLoading) {
    return (
      <ShowView>
        <ShowViewHeader />
        <div className="text-center py-8">読み込み中...</div>
      </ShowView>
    );
  }

  if (!result) {
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
          <CardTitle>{result.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              ID
            </h3>
            <p className="text-sm">{result.id}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              日付
            </h3>
            <p className="text-sm">{result.date}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              種類
            </h3>
            <Badge variant="outline">{result.type}</Badge>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              公開ステータス
            </h3>
            <Badge
              variant={
                result.publicationStatus === PublicationStatus.Published
                  ? "default"
                  : result.publicationStatus === PublicationStatus.Draft
                    ? "secondary"
                    : "outline"
              }
            >
              {result.publicationStatus === PublicationStatus.Published
                ? "公開中"
                : result.publicationStatus === PublicationStatus.Draft
                  ? "下書き"
                  : "アーカイブ"}
            </Badge>
          </div>

          {result.description && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                説明
              </h3>
              <p className="text-sm whitespace-pre-wrap">
                {result.description}
              </p>
            </div>
          )}

          {result.thumbnail && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                サムネイル
              </h3>
              <Image
                src={result.thumbnail}
                alt={result.title}
                className="max-w-md rounded-md border"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </ShowView>
  );
}
