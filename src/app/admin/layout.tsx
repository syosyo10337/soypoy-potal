"use client";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/app";
import { dataProvider } from "@/infrastructure/refine/data-provider";
import { TRPCProvider } from "@/infrastructure/trpc/provider";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <TRPCProvider>
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
        {children}
      </Refine>
    </TRPCProvider>
  );
}
