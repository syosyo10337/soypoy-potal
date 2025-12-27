"use client";

import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";

interface EventActionsProps {
  eventId: string;
}

/**
 * イベント操作ボタン群
 *
 * Refineのボタンコンポーネントを使用
 * Client Componentとして分離することで、
 * 親コンポーネントをServer Componentに保つ
 */
export function EventActions({ eventId }: EventActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <ShowButton
        recordItemId={eventId}
        className="bg-primary text-primary-foreground"
      />
      <EditButton
        recordItemId={eventId}
        className="bg-secondary text-secondary-foreground"
      />
      <DeleteButton
        recordItemId={eventId}
        className="bg-destructive text-destructive-foreground"
      />
    </div>
  );
}
