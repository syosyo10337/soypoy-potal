"use client";

import { useShow } from "@refinedev/core";
import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import { AdminDetailCard } from "./AdminDetailCard";
import { AdminError } from "./AdminError";
import { AdminLoading } from "./AdminLoading";
import { AdminNotFound } from "./AdminNotFound";

type Admin = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// TODO: Entityをdomain層へ移行する;
export function AdminDetailContent() {
  const { query } = useShow<Admin>();

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
