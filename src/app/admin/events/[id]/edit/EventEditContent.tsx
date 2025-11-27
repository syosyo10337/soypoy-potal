"use client";

import { useOne } from "@refinedev/core";
import type { EventEntity } from "@/domain/entities";
import { EventError } from "../_components/EventError";
import { EventLoading } from "../_components/EventLoading";
import { EventNotFound } from "../_components/EventNotFound";
import { EventEditForm } from "./_components/EventEditForm";

type EventEditContentProps = {
  eventId: string;
};

export function EventEditContent({ eventId }: EventEditContentProps) {
  const { query } = useOne<EventEntity>({
    resource: "events",
    id: eventId,
  });

  const { data, isLoading, isError, refetch } = query;

  if (isLoading) {
    return <EventLoading viewType="edit" />;
  }

  if (isError) {
    return <EventError viewType="edit" onRetry={() => refetch()} />;
  }

  if (!data) {
    return <EventNotFound viewType="edit" />;
  }

  return <EventEditForm event={data.data} eventId={eventId} />;
}
