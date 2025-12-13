import "server-only";
import { createContext } from "./context";
import { appRouter } from "./router";

/**
 * Server Component (RSC) 用の tRPC Caller
 *
 * Server Component から tRPC procedure を直接呼び出すためのヘルパー。
 *
 */
export const createServerCaller = () => {
  const ctx = createContext();
  return appRouter.createCaller(ctx);
};
