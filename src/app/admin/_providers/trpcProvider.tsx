"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "@/infrastructure/trpc/client";

/**
 * 管理画面用のtRPC Provider
 *
 * Refineの標準的なdataProviderではカバーできない特殊な操作
 * (パスワード変更など非CRUD操作)に対応するため、
 * React Query + tRPCの組み合わせを提供
 *
 * 【役割】
 * - Refine dataProvider: CRUD操作 (getList, getOne, create, update, delete)
 * - tRPC Provider: 非CRUD操作 (changePassword, resetPasswordなど)
 */
export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: "/api/trpc" })],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
