import type { BaseKey, BaseRecord, DataProvider } from "@refinedev/core";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@/infrastructure/trpc/router";

/**
 * tRPCクライアントの作成
 *
 * createTRPCProxyClient: tRPCのクライアントを作成
 * httpBatchLink: HTTPリクエストをバッチ処理するリンク
 *
 * これにより、ブラウザからAPIを呼び出せるようになる
 */
const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
});

/**
 * BaseKeyをstringに変換
 * RefineのBaseKeyはstring | numberだが、tRPCはstringを期待する
 */
const toBaseKeyString = (id: BaseKey): string => String(id);

const resourceHandlers = {
  events: trpcClient.events,
  admins: trpcClient.admins,
};
type SupportedResource = keyof typeof resourceHandlers;

const isSupportedResource = (
  resource: string,
): resource is SupportedResource => {
  return resource in resourceHandlers;
};

/**
 * Refine用のtRPC Data Provider
 *
 * Refineは独自のData Providerインターフェースを持っている
 * このData Providerが、Refineの標準的なメソッド（getList, getOne, create, update, delete）を
 * tRPCのAPI呼び出しに変換する
 *
 * つまり、Refineの管理画面UIからは標準的なAPIを呼び出すだけで、
 * 実際にはtRPCを通じてServices層が呼ばれる
 */
export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({ resource }) => {
    if (!isSupportedResource(resource)) {
      throw new Error(`Unsupported resource: ${resource}`);
    }
    const data = await resourceHandlers[resource].list.query();
    return {
      data: data as unknown as TData[],
      total: data.length,
    };
  },

  getOne: async <TData extends BaseRecord = BaseRecord>({ resource, id }) => {
    if (!isSupportedResource(resource)) {
      throw new Error(`Unsupported resource: ${resource}`);
    }

    const resourceId = toBaseKeyString(id);
    const data = await resourceHandlers[resource].getById.query(resourceId);
    if (!data) {
      throw new Error(`${resource} with id ${id} not found`);
    }
    return { data: data as unknown as TData };
  },

  create: async <TData extends BaseRecord = BaseRecord>({
    resource,
    variables,
  }) => {
    if (!isSupportedResource(resource)) {
      throw new Error(`Unsupported resource: ${resource}`);
    }
    const data = await resourceHandlers[resource].create.mutate(variables);
    return { data: data as unknown as TData };
  },

  update: async <TData extends BaseRecord = BaseRecord>({
    resource,
    id,
    variables,
  }) => {
    if (!isSupportedResource(resource)) {
      throw new Error(`Unsupported resource: ${resource}`);
    }
    const resourceId = toBaseKeyString(id);
    const data = await resourceHandlers[resource].update.mutate({
      id: resourceId,
      data: variables,
    });
    return { data: data as unknown as TData };
  },

  deleteOne: async <TData extends BaseRecord = BaseRecord>({
    resource,
    id,
  }) => {
    if (!isSupportedResource(resource)) {
      throw new Error(`Unsupported resource: ${resource}`);
    }
    const resourceId = toBaseKeyString(id);
    const data = await resourceHandlers[resource].delete.mutate(resourceId);
    return { data: data as unknown as TData };
  },

  getApiUrl: () => "/api/trpc",
};
