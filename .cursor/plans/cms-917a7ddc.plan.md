<!-- 917a7ddc-bbbd-4229-b7ee-dbece265cc55 4c014d01-e68d-4e18-9465-9ac16a9750c0 -->
# CMS管理画面実装計画（レイヤー順）

## 概要

Refine + tRPC + Drizzle + Neonを使用した管理画面を実装し、既存のClean Architecture構造に統合する。NotionからNeon DBへの完全移行を前提とする。実装は内側（Domain層）から外側（App層）へ進める。

## ディレクトリ構造の調整（Clean Architecture準拠）

### 既存構造の維持

```
src/
├── app/              # Presentation Layer
│   ├── (home)/       # 既存ユーザー画面
│   ├── admin/        # 管理画面（新規追加）
│   └── api/
│       └── trpc/
│           └── [trpc]/
│               └── route.ts
├── domain/           # Domain Layer（既存）
├── services/         # Application Layer（既存）
└── infrastructure/   # Infrastructure Layer
    ├── notion/       # 既存Notion実装
    ├── db/           # Drizzle設定（新規追加）
    │   ├── index.ts
    │   ├── schema.ts
    │   └── repositories/
    │       └── drizzleEventRepository.ts
    ├── trpc/         # tRPC設定（新規追加）
    │   ├── context.ts
    │   ├── router.ts
    │   └── routers/
    │       ├── index.ts
    │       └── events.ts
    └── refine/       # Refine設定（新規追加）
        └── data-provider.ts
```

## 実装ステップ（レイヤー順）

### Phase 0: 基盤セットアップ

1. **依存関係のインストール**

   - `@refinedev/core`, `@refinedev/nextjs-router`, `@refinedev/react-hook-form`
   - `@trpc/server`, `@trpc/client`, `@trpc/react-query`
   - `drizzle-orm`, `@neondatabase/serverless`
   - `drizzle-kit` (開発用)

2. **環境変数設定**

   - `.env.local`に`DATABASE_URL`（Neon接続文字列）を追加

### Phase 1: Domain層の実装（最内層）

1. **エンティティの確認**

   - `src/domain/entities/event.ts`: 既存エンティティを確認（IDフィールドは既に存在）

2. **リポジトリインターフェースの拡張**

   - `src/domain/repositories/eventRepository.ts`: CRUD操作を追加
     - `create()`, `update()`, `delete()`メソッドを追加

### Phase 2: Infrastructure層の実装

1. **Drizzle設定（Neon接続）**

   - `src/infrastructure/db/index.ts`: Neon DB接続クライアントを作成
     - `@neondatabase/serverless`の`neon()`関数を使用してNeon接続を初期化
     - Drizzleクライアント（`drizzle()`）をエクスポート
     - 環境変数`DATABASE_URL`から接続文字列を読み込み
   - `src/infrastructure/db/schema.ts`: イベントスキーマ定義（EventEntityベース）
   - `drizzle.config.ts`: Drizzle設定ファイル（マイグレーション用）

2. **Drizzleリポジトリ実装**

   - `src/infrastructure/db/repositories/drizzleEventRepository.ts`: EventRepository実装
   - Drizzleクライアント（`src/infrastructure/db/index.ts`からインポート）を使用してCRUD操作を実装

3. **tRPC設定**

   - `src/infrastructure/trpc/context.ts`: tRPCコンテキスト
     - Drizzleリポジトリを初期化してコンテキストに含める
     - リクエストごとに新しいリポジトリインスタンスを作成（またはシングルトン）
   - `src/infrastructure/trpc/routers/events.ts`: イベント操作ルーター
     - コンテキストからリポジトリを取得し、services層を呼び出す
   - `src/infrastructure/trpc/router.ts`: ルート統合
   - ルーターはservices層を呼び出す（ビジネスロジックの分離）

4. **Refine Data Provider**

   - `src/infrastructure/refine/data-provider.ts`: tRPCを使用したカスタムプロバイダー

### Neon接続の流れ

```
環境変数 DATABASE_URL
    ↓
src/infrastructure/db/index.ts (Neon接続 + Drizzleクライアント作成)
    ↓
src/infrastructure/db/repositories/drizzleEventRepository.ts (リポジトリ実装)
    ↓
src/infrastructure/trpc/context.ts (tRPCコンテキストでリポジトリ初期化)
    ↓
src/infrastructure/trpc/routers/events.ts (ルーターでservices層を呼び出し)
```

### Phase 3: Services層の実装

1. **EventServiceの拡張**

   - `src/services/eventService.ts`: create, update, deleteメソッドを追加
   - 既存のeventServiceインスタンスをDrizzleリポジトリに切り替え

### Phase 4: App層の実装（最外層）

1. **tRPC API Route**

   - `src/app/api/trpc/[trpc]/route.ts`: Next.js App Router統合

2. **tRPCクライアント設定**

   - `src/lib/trpc/client.ts`: クライアントセットアップ（app層から使用）

3. **管理画面のRefine設定**

   - `src/app/admin/layout.tsx`: Refineプロバイダー設定
   - `src/app/admin/page.tsx`: ダッシュボード

4. **管理画面UI実装**

   - `src/app/admin/[resource]/page.tsx`: 動的リソースページ
   - イベント管理のCRUD画面を実装

### Phase 5: マイグレーション

1. **マイグレーション実行**

   - Drizzle Kitでスキーマからマイグレーション生成
   - 初回マイグレーション実行

## 重要な設計判断

### Clean Architecture準拠ポイント

- **tRPCルーター**: `infrastructure/trpc/`に配置（外部システム接続）
- **ルーターからのサービス呼び出し**: ルーターは`services/eventService`を呼び出し、ビジネスロジックはservices層に保持
- **Drizzleスキーマ**: `infrastructure/db/`に配置（データベースは外部システム）
- **管理画面UI**: `app/admin/`に配置（Presentation層）

### 依存関係の流れ

```
app/admin/ → services/eventService → domain/EventRepository
                ↓
infrastructure/trpc/routers/ → services/eventService
infrastructure/db/repositories/ → domain/EventRepository (implements)
```

### 移行戦略

- 初期実装では既存のNotionリポジトリと並行運用可能にする
- サービス層でリポジトリの切り替えが可能な設計を維持
- 後でNotionリポジトリを削除し、Drizzleリポジトリに完全移行

## 参考文献

- [Refine Documentation](https://refine.dev/docs/)
- [tRPC Documentation](https://trpc.io/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Neon Documentation](https://neon.tech/docs)

### To-dos

- [x] 必要なパッケージをインストール（refine, trpc, drizzle, neon）
- [x] Drizzle設定とNeon DB接続の実装（db/index.ts, schema.ts, drizzle.config.ts）
- [ ] Domain層のリポジトリインターフェースにCRUD操作を追加
- [ ] Drizzleを使用したEventRepository実装を作成
- [ ] tRPCルーターとコンテキストの実装（infrastructure/trpc/）
- [ ] Next.js App Router用のtRPC API Routeを作成
- [ ] EventServiceにCRUD操作を追加し、Drizzleリポジトリに切り替え
- [ ] Refine用のtRPCデータプロバイダーを実装
- [ ] 管理画面のRefineレイアウトとプロバイダー設定
- [ ] 管理画面のUI実装（イベントCRUD画面）
- [ ] Drizzle Kitでマイグレーションファイルを生成・実行
- [ ] 必要なパッケージをインストール（refine, trpc, drizzle, neon）
- [ ] Drizzle設定とNeon DB接続の実装（db/index.ts, schema.ts, drizzle.config.ts）
- [ ] Domain層のリポジトリインターフェースにCRUD操作を追加
- [ ] Drizzleを使用したEventRepository実装を作成
- [ ] tRPCルーターとコンテキストの実装（infrastructure/trpc/）
- [ ] Next.js App Router用のtRPC API Routeを作成
- [ ] EventServiceにCRUD操作を追加し、Drizzleリポジトリに切り替え
- [ ] Refine用のtRPCデータプロバイダーを実装
- [ ] 管理画面のRefineレイアウトとプロバイダー設定
- [ ] 管理画面のUI実装（イベントCRUD画面）
- [ ] Drizzle Kitでマイグレーションファイルを生成・実行