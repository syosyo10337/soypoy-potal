# Project Structure
## ディレクトリ構成

### ルートディレクトリ
```
/
├── bin/                    # 開発用スクリプト
├── docker/                 # Docker設定
├── docs/                   # プロジェクトドキュメント
├── public/                 # 静的ファイル（cssのurlで利用するものなど）
├── src/                   # ソースコード
└── 設定ファイル群
```

### ソースコード構成 (`/src/`)

#### 1. App Router (`/src/app/`) - プレゼンテーション層
Next.js App Routerを使用したUI層。ページとコンポーネントを管理。

```
app/
├── (home)/                # ホームページ（ルートグループ）
│   ├── _components/       # ホームページ専用コンポーネント
│   │   ├── HeroSection/   # ヒーローセクション
│   │   ├── PIckUpSection/ # ピックアップセクション
│   │   └── WhatUpSection/ # What's Upセクション
│   ├── _dummies/         # ダミーデータ
│   └── page.tsx          # ホームページ
├── about/                 # アバウトページ
├── events/                # イベントページ
│   └── _components/       # イベントページ専用コンポーネント
├── whats-up/              # What's Upページ
├── layout.tsx             # ルートレイアウト
└── not-found.tsx          # 404ページ
```

**特徴**:
- ページごとに専用コンポーネントを`_components/`に配置
- ルートグループ`(home)`でルートページを管理
- 各ページのコンポーネントは最小限に抑制

#### 2. Domain層 (`/app/src/domain/`) - ドメイン層
ビジネスエンティティとリポジトリインターフェースを定義。

```
domain/
├── entities/              # ドメインエンティティ
│   ├── event.ts          # イベントエンティティ
│   └── eventType.ts      # イベントタイプエンティティ
└── repositories/          # リポジトリインターフェース
    └── eventRepository.ts # イベントリポジトリインターフェース
```

**特徴**:
- 外部依存なし（フレームワーク非依存）
- ビジネスルールを表現
- リポジトリパターンでデータアクセスを抽象化

#### 3. Services層 (`/app/src/services/`) - アプリケーション層
ビジネスロジックとユースケースを実装。

```
services/
└── eventService.ts        # イベントサービス
```

**特徴**:
- ドメイン層のみに依存
- ビジネスロジックを担当
- リポジトリを依存性注入で受け取る

#### 4. Infrastructure層 (`/app/src/infrastructure/`) - インフラストラクチャ層
外部システム（Notion API）との接続を実装。

```
infrastructure/
└── notion/                # Notion API実装
    ├── client/            # Notionクライアント
    │   ├── notionClient.ts
    │   └── queries.ts
    ├── config/            # 設定とスキーマ
    │   ├── constants.ts
    │   ├── schemas/       # Zodスキーマ
    │   └── types.ts
    └── repositories/      # リポジトリ実装
        └── notionEventRepository.ts
```

**特徴**:
- ドメインのリポジトリインターフェースを実装
- 外部APIとの通信を担当
- データ変換とエラーハンドリング

#### 5. 共通リソース

##### Components (`/app/src/components/`) - 共通コンポーネント
```
components/
├── BubleLabel/            # バブルラベルコンポーネント
├── Footer/                # フッターコンポーネント
├── Header/                # ヘッダーコンポーネント
└── shadcn/                # shadcn/uiコンポーネント
```

##### Assets (`/app/src/assets/`) - 共通アセット
```
assets/
├── fonts/                 # フォントファイル
│   ├── anymale/
│   └── bernard/
├── icons/                 # アイコンファイル
├── globals.css            # グローバルスタイル
└── no-image.png          # デフォルト画像
```

##### Utils (`/app/src/utils/`) - ユーティリティ
```
utils/
├── cn.ts                  # className結合ユーティリティ
└── date.ts                # 日付処理ユーティリティ
```

##### Types (`/app/src/types/`) - 型定義
```
types/
└── svg.d.ts              # SVG型定義
```

## Clean Architecture 依存関係ルール

### ✅ 許可された依存関係（内側 ← 外側）
```
app/           → services/        ✅ (UIがビジネスロジックを使用)
app/           → domain/          ✅ (UIがエンティティを使用)
services/      → domain/          ✅ (ユースケースがエンティティを使用)
infrastructure/ → domain/         ✅ (外部アダプターがドメインインターフェースを実装)
```

### ❌ 禁止された依存関係（内側 → 外側）
```
domain/        → infrastructure/  ❌ (ドメインは外部システムに依存しない)
domain/        → services/        ❌ (エンティティはユースケースに依存しない)
domain/        → app/             ❌ (ドメインはUIに依存しない)
services/      → infrastructure/  ❌ (ユースケースは外部システムに直接依存しない)
services/      → app/             ❌ (ビジネスロジックはUIに依存しない)
```

## ファイル配置の特徴

### 1. フロントエンドの最小化
- ページごとに専用コンポーネントを`_components/`に配置
- 共通コンポーネントは`/src/components/`に集約
- アセットは用途別に適切に配置

### 2. 静的ファイルの配置
- **`/public/layouts/`**: 背景画像などレイアウト用の画像
- **`/src/assets/`**: アプリケーション内で使用するアセット
- **`/src/components/*/assets/`**: コンポーネント専用のアセット
