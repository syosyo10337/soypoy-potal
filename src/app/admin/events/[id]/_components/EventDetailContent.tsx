"use client";

import { useShow } from "@refinedev/core";
import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import type { EventEntity } from "@/domain/entities";
import { EventDetailCard } from "./EventDetailCard";
import { EventError } from "./EventError";
import { EventLoading } from "./EventLoading";
import { EventNotFound } from "./EventNotFound";

export function EventDetailContent() {
  const { query } = useShow<EventEntity>();

  const { data, isLoading, isError, refetch } = query;

  if (isLoading) {
    return <EventLoading viewType="show" />;
  }

  if (isError) {
    return <EventError viewType="show" onRetry={() => refetch()} />;
  }

  if (!data) {
    return <EventNotFound viewType="show" />;
  }

  return (
    <ShowView>
      <ShowViewHeader />
      <EventDetailCard event={data.data} />
    </ShowView>
  );
}
