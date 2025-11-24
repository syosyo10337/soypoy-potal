"use client";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/app";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { dataProvider } from "@/infrastructure/refine/data-provider";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider}
      resources={[
        {
          name: "events",
          list: "/admin/events",
          create: "/admin/events/create",
          edit: "/admin/events/:id/edit",
          show: "/admin/events/:id",
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
  );
}
