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
const toBaseKeyString = (id: BaseKey): string => {
  return String(id);
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
  // TODO: pagination, filters, sortersを実装する
  getList: async <TData extends BaseRecord = BaseRecord>({ resource }) => {
    if (resource !== "events") {
      throw new Error(`Unsupported resource: ${resource}`);
    }
    const events = await trpcClient.events.list.query();

    return {
      data: events as unknown as TData[],
      total: events.length,
    };
  },
  getOne: async <TData extends BaseRecord = BaseRecord>({ resource, id }) => {
    if (resource !== "events") {
      throw new Error(`Unsupported resource: ${resource}`);
    }
    const eventId = toBaseKeyString(id);
    const event = await trpcClient.events.getById.query(eventId);

    if (!event) {
      throw new Error(`Event with id ${id} not found`);
    }

    return {
      data: event as unknown as TData,
    };
  },
  create: async <TData extends BaseRecord = BaseRecord>({
    resource,
    variables,
  }) => {
    if (resource !== "events") {
      throw new Error(`Unsupported resource: ${resource}`);
    }
    // variablesはEventEntity型であることを前提とする
    // tRPCのZodスキーマでバリデーションされるため、型キャストは安全
    const event = await trpcClient.events.create.mutate(variables);

    return {
      data: event as TData,
    };
  },
  update: async <TData extends BaseRecord = BaseRecord>({
    resource,
    id,
    variables,
  }) => {
    if (resource !== "events") {
      throw new Error(`Unsupported resource: ${resource}`);
    }

    const eventId = toBaseKeyString(id);
    // variablesはPartial<Omit<EventEntity, "id">>型であることを前提とする
    // tRPCのZodスキーマでバリデーションされるため、型キャストは安全
    const event = await trpcClient.events.update.mutate({
      id: eventId,
      data: variables,
    });

    return {
      data: event as unknown as TData,
    };
  },
  deleteOne: async <TData extends BaseRecord = BaseRecord>({
    resource,
    id,
  }) => {
    if (resource !== "events") {
      throw new Error(`Unsupported resource: ${resource}`);
    }
    const eventId = toBaseKeyString(id);
    await trpcClient.events.delete.mutate(eventId);

    return {
      data: { id } as TData,
    };
  },
  getApiUrl: () => {
    return "/api/trpc";
  },
};
