"use client";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/app";
import { Suspense } from "react";
import { authProvider } from "@/infrastructure/refine/auth-provider";
import { dataProvider } from "@/infrastructure/refine/data-provider";
import AdminLoading from "./loading";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Suspense fallback={<AdminLoading />}>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider}
        authProvider={authProvider}
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
          {
            name: "admins",
            list: "/admin/admins",
            create: "/admin/admins/create",
            edit: "/admin/admins/:id/edit",
            show: "/admin/admins/:id",
            meta: {
              label: "管理者",
            },
          },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          projectId: "soypoy-admin",
        }}
      >
        {children}
      </Refine>
    </Suspense>
  );
}
