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

### Phase 4: App層の実装（最外層）+ shadcn/ui統合

#### Phase 4.1: tRPCクライアント設定（App層）

1. **tRPCクライアント設定**

   - `src/infrastructure/trpc/client.ts`: クライアントセットアップ（app層から使用）
     - Infrastructure層に配置（サーバー側の設定と同じ`infrastructure/trpc/`ディレクトリ）
     - 外部API（tRPCサーバー）との接続を担当するため、Infrastructure層が適切
     - React Query統合とProvider設定

#### Phase 4.2: shadcn/ui + Refineコンポーネントのインストール

**統合順序の理由:**

1. まずshadcn/uiコンポーネントを追加（基盤となるUIコンポーネント）
2. 次にRefineのshadcn/ui統合コンポーネントを追加（Refine専用コンポーネント）
3. 最後に管理画面UIを実装（統合されたコンポーネントを使用）

**ステップ:**

1. **shadcn/ui基本コンポーネントの追加**（必要なもののみ）
   ```bash
   # テーブル関連
   npx shadcn@latest add table
   npx shadcn@latest add dropdown-menu
   npx shadcn@latest add input
   npx shadcn@latest add label
   npx shadcn@latest add select
   npx shadcn@latest add checkbox
   npx shadcn@latest add calendar
   npx shadcn@latest add popover
   npx shadcn@latest add dialog
   npx shadcn@latest add toast
   npx shadcn@latest add card
   npx shadcn@latest add badge
   ```

2. **Refineのshadcn/uiコンポーネントを追加**
   ```bash
   # 基本ビュー（List, Create, Edit, Show）
   npx shadcn@latest add https://ui.refine.dev/r/views.json
   
   # データテーブル
   npx shadcn@latest add https://ui.refine.dev/r/data-table.json
   
   # フォーム
   npx shadcn@latest add https://ui.refine.dev/r/forms.json
   
   # レイアウト（サイドバー、ナビゲーション含む）
   npx shadcn@latest add https://ui.refine.dev/r/themed-layout.json
   
   # ボタン（Create, Edit, Delete, Show, List, Clone, Refresh）
   npx shadcn@latest add https://ui.refine.dev/r/buttons.json
   
   # エラーコンポーネント
   npx shadcn@latest add https://ui.refine.dev/r/error-component.json
   
   # 通知プロバイダー（Toast）
   npx shadcn@latest add https://ui.refine.dev/r/notification-provider.json
   
   # 自動保存インジケーター
   npx shadcn@latest add https://ui.refine.dev/r/auto-save-indicator.json
   ```


#### Phase 4.3: Refineプロバイダー設定

1. **管理画面レイアウト（Refine統合）**

   - `src/app/admin/layout.tsx`: Refineプロバイダー設定
     - `Refine`コンポーネントでプロバイダーをラップ
     - tRPCクライアントProvider設定
     - React Query Provider設定
     - Data Provider設定（既存の`data-provider.ts`を使用）
     - Router Provider設定（`@refinedev/nextjs-router`を使用）
     - Notification Provider設定（shadcn/uiのToast）

2. **管理画面ダッシュボード**

   - `src/app/admin/page.tsx`: ダッシュボード（リソース一覧）

#### Phase 4.4: 管理画面UI実装

1. **イベント管理画面**

   - `src/app/admin/events/page.tsx`: イベント一覧（List View）
     - `ListView`コンポーネントを使用
     - `DataTable`コンポーネントでテーブル表示
     - ソート、フィルタ、ページネーション機能

   - `src/app/admin/events/create/page.tsx`: イベント作成（Create View）
     - `CreateView`コンポーネントを使用
     - `useForm`フックでフォーム管理
     - バリデーション実装

   - `src/app/admin/events/edit/[id]/page.tsx`: イベント編集（Edit View）
     - `EditView`コンポーネントを使用
     - `useForm`フックでフォーム管理
     - 自動保存機能（オプション）

   - `src/app/admin/events/show/[id]/page.tsx`: イベント詳細（Show View）
     - `ShowView`コンポーネントを使用
     - イベント情報の表示

#### Phase 4.5: 必要な追加パッケージ

以下のパッケージが必要になる可能性があります：

```bash
pnpm add @refinedev/react-table  # DataTable用
pnpm add react-hook-form          # フォーム管理（既にインストール済みか確認）
pnpm add zod                      # バリデーション（既にインストール済み）
```

### Quick Start: Phase 4実装の流れ

**1. tRPCクライアント設定（5分）**

   - `src/infrastructure/trpc/client.ts`を作成
   - React Query統合設定
   - 注: Infrastructure層に配置（サーバー側と一貫性を保つため）

**2. shadcn/uiコンポーネント追加（10分）**

   - 基本コンポーネント（table, input, select等）を追加
   - Refine統合コンポーネントを追加

**3. Refineプロバイダー設定（15分）**

   - `src/app/admin/layout.tsx`を作成
   - 全てのProviderを設定

**4. イベント管理UI実装（30-60分）**

   - List View（一覧）
   - Create View（作成）
   - Edit View（編集）
   - Show View（詳細）

**合計予想時間: 60-90分**

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

#### Phase 0-3（完了済み）

- [x] 必要なパッケージをインストール（refine, trpc, drizzle, neon）
- [x] Drizzle設定とNeon DB接続の実装（db/index.ts, schema.ts, drizzle.config.ts）
- [x] Domain層のリポジトリインターフェースにCRUD操作を追加
- [x] Drizzleを使用したEventRepository実装を作成
- [x] tRPCルーターとコンテキストの実装（infrastructure/trpc/）
- [x] Next.js App Router用のtRPC API Routeを作成
- [x] EventServiceにCRUD操作を追加し、Drizzleリポジトリに切り替え
- [x] Refine用のtRPCデータプロバイダーを実装

#### Phase 4: App層の実装 + shadcn/ui統合

- [ ] Phase 4.1: tRPCクライアント設定（src/infrastructure/trpc/client.ts）
- [ ] Phase 4.2: shadcn/ui基本コンポーネントの追加
- [ ] Phase 4.2: Refineのshadcn/ui統合コンポーネントの追加
- [ ] Phase 4.3: Refineプロバイダー設定（src/app/admin/layout.tsx）
- [ ] Phase 4.3: 管理画面ダッシュボード（src/app/admin/page.tsx）
- [ ] Phase 4.4: イベント一覧画面（src/app/admin/events/page.tsx）
- [ ] Phase 4.4: イベント作成画面（src/app/admin/events/create/page.tsx）
- [ ] Phase 4.4: イベント編集画面（src/app/admin/events/edit/[id]/page.tsx）
- [ ] Phase 4.4: イベント詳細画面（src/app/admin/events/show/[id]/page.tsx）

#### Phase 5: マイグレーション

- [ ] Drizzle Kitでマイグレーションファイルを生成・実行