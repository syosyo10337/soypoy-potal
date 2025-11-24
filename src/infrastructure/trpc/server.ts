import "server-only";

import { createContext } from "./context";
import { appRouter } from "./router";

/**
 * tRPC Server Client
 *
 * Server ComponentsからtRPC APIを直接呼び出すためのクライアント
 *
 * 利点:
 * - HTTPリクエストを経由せず、Services層を直接実行
 * - Server Componentsでのデータフェッチが可能
 * - 初回レンダリングが高速（SSR）
 * - SEO対応
 */
export const api = appRouter.createCaller(createContext());
