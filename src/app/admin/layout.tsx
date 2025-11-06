"use client";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/app";
import { Suspense } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { dataProvider } from "@/infrastructure/refine/data-provider";
import { TRPCProvider } from "@/infrastructure/trpc/provider";
import AdminLoading from "./loading";

interface AdminLayoutProps {
  children: React.ReactNode;
}

//TODO: layoutはclientコンポーネントにしておきたくない。
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <TRPCProvider>
      <Suspense fallback={<AdminLoading />}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider}
          resources={[
            {
              name: "events",
              list: "/admin/events",
              create: "/admin/events/create",
              edit: "/admin/events/edit/:id",
              show: "/admin/events/show/:id",
              meta: {
                label: "イベント",
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            projectId: "soypoy-admin",
          }}
        >
          <div className="admin-theme min-h-screen">
            <AdminSidebar />
            <main className="p-16">{children}</main>
          </div>
        </Refine>
      </Suspense>
    </TRPCProvider>
  );
}
