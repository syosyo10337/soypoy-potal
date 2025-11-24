"use client";

import { useShow } from "@refinedev/core";
import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import type { EventEntity } from "@/domain/entities";
import { EventDetailCard } from "./EventDetailCard";
import { EventDetailError } from "./EventDetailError";
import { EventDetailLoading } from "./EventDetailLoading";
import { EventDetailNotFound } from "./EventDetailNotFound";

export function EventDetailContent() {
  const { query } = useShow<EventEntity>();

  const { data, isLoading, isError, refetch } = query;

  if (isLoading) {
    return <EventDetailLoading />;
  }

  if (isError) {
    return <EventDetailError onRetry={() => refetch()} />;
  }

  if (!data) {
    return <EventDetailNotFound />;
  }

  return (
    <ShowView>
      <ShowViewHeader />
      <EventDetailCard event={data.data} />
    </ShowView>
  );
}
