"use client";

import { useShow } from "@refinedev/core";
import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import type { AdminUserEntity } from "@/domain/entities";
import { AdminDetailCard } from "./AdminDetailCard";
import { AdminError } from "./AdminError";
import { AdminLoading } from "./AdminLoading";
import { AdminNotFound } from "./AdminNotFound";

export function AdminDetailContent() {
  const { query } = useShow<AdminUserEntity>();

  const { data, isLoading, isError, refetch } = query;

  if (isLoading) {
    return <AdminLoading />;
  }

  if (isError) {
    return <AdminError onRetry={() => refetch()} />;
  }

  if (!data?.data) {
    return <AdminNotFound />;
  }

  return (
    <ShowView>
      <ShowViewHeader />
      <AdminDetailCard admin={data.data} />
    </ShowView>
  );
}
