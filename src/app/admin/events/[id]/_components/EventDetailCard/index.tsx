import Image from "next/image";
import { EventStatusBadge } from "@/components/admin/EventStatusBadge";
import { Badge } from "@/components/shadcn/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import type { EventEntity } from "@/domain/entities";

interface EventDetailCardProps {
  event: EventEntity;
}

export function EventDetailCard({ event }: EventDetailCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">ID</h3>
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
          <EventStatusBadge variant={event.publicationStatus} />
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
              width={500}
              height={300}
              className="max-w-md rounded-md border"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
