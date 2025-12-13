import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "@/infrastructure/trpc/context";
import { appRouter } from "@/infrastructure/trpc/router";

/**
 * tRPC API Route
 *
 * このファイルが /api/trpc/[trpc]/route.ts に配置されることで、
 * 全てのClientComponentsからのtRPCリクエストがこのハンドラーを通る
 *
 * [trpc]は動的ルートパラメータで、実際のエンドポイント名が入る
 * e.g. /api/trpc/events.list
 */

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });

export const GET = handler;
export const POST = handler;
