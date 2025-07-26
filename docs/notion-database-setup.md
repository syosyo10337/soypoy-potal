# NotionDB セットアップ・追加ガイド

このドキュメントでは、SOY-POYプロジェクトにおけるNotionデータベースの初期設定方法と、新しいデータベースの追加方法について説明します。

## 目次

1. [初期設定](#初期設定)
2. [環境変数の設定](#環境変数の設定)
3. [新しいNotionDBの追加手順](#新しいnotiondbの追加手順)
4. [Clean Architecture との統合](#clean-architecture-との統合)
5. [実際の例：EventDB の実装](#実際の例eventdb-の実装)
6. [トラブルシューティング](#トラブルシューティング)

## 初期設定

### 1. Notion Integration の作成
こちらは、[正尚](https://github.com/syosyo10337)が管理するSOY-POY adminワークスペースをすでに設定してあります。
cf. https://www.notion.so/SOY-POY-admin-22bc260014a3809f8a83cb5b252241df?source=copy_link

### 2. Notionデータベースの準備

各データベースに対して以下の手順を実行：

1. Notionでデータベースを作成
2. データベースの共有設定を開く
3. 先ほど作成したIntegrationを招待
4. データベースURLから **Database ID** を取得
   ```
   https://notion.so/workspace/DATABASE_ID?v=VIEW_ID
   ```
   `DATABASE_ID` の部分（32文字のハイフン区切り文字列）をコピー

## 環境変数の設定

プロジェクトルートに `.env.local` ファイルを作成し、以下の環境変数を設定：

```bash
# Notion API
NOTION_API_KEY=your_notion_integration_token_here

# Notion Database IDs
NOTION_EVENTS_DB_ID=your_events_database_id_here
NOTION_MEMBERS_DB_ID=your_members_database_id_here
# 新しいDBを追加する場合は以下に追加
# NOTION_[MODEL_NAME]_DB_ID=your_new_database_id_here
```

## 新しいNotionDBのアプリケーションでの追加手順

新しいデータベース（例：`Member`）を追加する場合の手順：

### Step 1: Domain Layer の作成

#### 1.1 エンティティの定義

`src/domain/entities/member.ts`

```typescript
/**
 * メンバーエンティティ
 * ドメイン層のメンバーを表す
 */
export interface MemberEntity {
  id: string;
  name: string;
  role: string;
  email: string;
  joinDate: string;
  profileImageUrl: string | "";
}
```

#### 1.2 リポジトリインターフェースの定義

`src/domain/repositories/memberRepository.ts`

```typescript
import type { MemberEntity } from "../entities/member";

/**
 * メンバーリポジトリインターフェース
 * データアクセスの抽象化（読み取り専用）
 */
export interface MemberRepository {
  /**
   * 全てのメンバーを取得
   */
  findAll(): Promise<MemberEntity[]>;

  /**
   * IDによるメンバー取得
   */
  findById(id: string): Promise<MemberEntity | undefined>;

  /**
   * ロール別メンバー取得
   */
  findByRole(role: string): Promise<MemberEntity[]>;
}
```

### Step 2: Infrastructure Layer の実装

#### 2.1 データベースIDの追加

`src/infrastructure/notion/config/constants.ts`

```typescript
export const NOTION_DB_KEYS = {
  events: process.env.NOTION_EVENTS_DB_ID || "",
  members: process.env.NOTION_MEMBERS_DB_ID || "",
  // 新しいDBを追加
  members: process.env.NOTION_MEMBERS_DB_ID || "",
} as const;
```

#### 2.2 スキーマの定義

`src/infrastructure/notion/config/schemas/memberSchema.ts`

```typescript
import {
  type NotionDBSchema,
  type InferSchemaType,
  NOTION_PROPERTY,
} from "@/infrastructure/notion/config";

export const memberSchema = {
  id: { name: "ID", type: NOTION_PROPERTY.UNIQUE_ID },
  name: { name: "Name", type: NOTION_PROPERTY.TITLE },
  role: { name: "Role", type: NOTION_PROPERTY.SELECT },
  email: { name: "Email", type: NOTION_PROPERTY.EMAIL },
  joinDate: { name: "Join Date", type: NOTION_PROPERTY.DATE },
  profileImageUrl: {
    name: "Profile Image",
    type: NOTION_PROPERTY.FILES,
    defaultValue: "",
  },
} as const satisfies NotionDBSchema;

export type NotionMember = InferSchemaType<typeof memberSchema>;
```

#### 2.3 リポジトリの実装

`src/infrastructure/notion/repositories/notionMemberRepository.ts`

```typescript
import type { MemberEntity } from "@/domain/entities/member";
import type { MemberRepository } from "@/domain/repositories/memberRepository";
import { getPage, queryDatabase } from "../client/queries";
import { NOTION_DB_KEYS } from "../config/constants";
import { type NotionMember, memberSchema } from "../config/schemas/memberSchema";

/**
 * Notion実装のMemberRepository（読み取り専用）
 */
export class NotionMemberRepository implements MemberRepository {
  /**
   * 全てのメンバーを取得
   */
  async findAll(): Promise<MemberEntity[]> {
    try {
      const notionMembers = await queryDatabase<NotionMember>(
        NOTION_DB_KEYS.members,
        memberSchema,
        {
          sorts: [{ property: "Join Date", direction: "ascending" }],
        },
      );

      return notionMembers.map(this.toDomainEntity);
    } catch (error) {
      console.error("Error fetching members:", error);
      throw new Error("Failed to fetch members");
    }
  }

  /**
   * IDによるメンバー取得
   */
  async findById(id: string): Promise<MemberEntity | undefined> {
    try {
      const notionMember = await getPage<NotionMember>(id, memberSchema);
      return notionMember ? this.toDomainEntity(notionMember) : undefined;
    } catch (error) {
      console.error("Error fetching member by ID:", error);
      return undefined;
    }
  }

  /**
   * ロール別メンバー取得
   */
  async findByRole(role: string): Promise<MemberEntity[]> {
    try {
      const notionMembers = await queryDatabase<NotionMember>(
        NOTION_DB_KEYS.members,
        memberSchema,
        {
          filter: {
            property: "Role",
            select: {
              equals: role,
            },
          },
        },
      );

      return notionMembers.map(this.toDomainEntity);
    } catch (error) {
      console.error("Error fetching members by role:", error);
      throw new Error("Failed to fetch members by role");
    }
  }

  /**
   * NotionからDomainEntityへの変換
   */
  private toDomainEntity(notionMember: NotionMember): MemberEntity {
    return {
      id: notionMember.id,
      name: notionMember.name,
      role: notionMember.role,
      email: notionMember.email,
      joinDate: notionMember.joinDate,
      profileImageUrl: notionMember.profileImageUrl,
    };
  }
}
```

### Step 3: Services Layer の実装

`src/services/memberService.ts`

```typescript
import type { MemberEntity } from "@/domain/entities/member";
import type { MemberRepository } from "@/domain/repositories/memberRepository";
import { NotionMemberRepository } from "@/infrastructure/notion/repositories/notionMemberRepository";

/**
 * メンバーサービス（読み取り専用）
 * ビジネスロジックを担当
 */
export class MemberService {
  constructor(private repository: MemberRepository) {}

  /**
   * 全てのメンバーを取得
   */
  async getAllMembers(): Promise<MemberEntity[]> {
    return await this.repository.findAll();
  }

  /**
   * IDによるメンバー取得
   */
  async getMemberById(id: string): Promise<MemberEntity | undefined> {
    return await this.repository.findById(id);
  }

  /**
   * 活動中のメンバーを取得
   */
  async getActiveMembers(): Promise<MemberEntity[]> {
    return await this.repository.findByRole("Active");
  }
}

// デフォルトのサービスインスタンス（Notion実装を使用）
export const memberService = new MemberService(new NotionMemberRepository());
```

### Step 4: App Layer での使用

`src/app/members/page.tsx`

```typescript
import { memberService } from "@/services/memberService";

export default async function MembersPage() {
  const members = await memberService.getAllMembers();

  return (
    <div>
      <h1>Members</h1>
      {members.map((member) => (
        <div key={member.id}>
          <h2>{member.name}</h2>
          <p>Role: {member.role}</p>
          <p>Email: {member.email}</p>
        </div>
      ))}
    </div>
  );
}
```

## Clean Architecture との統合

このプロジェクトではClean Architectureを採用しており、以下の依存関係ルールを守る必要があります：

### ✅ 許可される依存関係
- `app/` → `services/` → `domain/`
- `infrastructure/` → `domain/`

### ❌ 禁止される依存関係
- `domain/` → `infrastructure/`, `services/`, `app/`
- `services/` → `infrastructure/`, `app/`

### 依存性注入パターン

```typescript
// ✅ GOOD: サービスはリポジトリインターフェースに依存
export class MemberService {
  constructor(private repository: MemberRepository) {} // ← インターフェース
}

// ✅ GOOD: インフラストラクチャはドメインインターフェースを実装
export class NotionMemberRepository implements MemberRepository {
  // implementation
}

// ✅ GOOD: サービス層で依存関係を組み立て
export const memberService = new MemberService(new NotionMemberRepository());
```

## 実際の例：EventDB の実装

現在のプロジェクトには、すでにEventDBの実装例があります：

### ファイル構造
```
src/
├── domain/
│   ├── entities/event.ts              # エンティティ定義
│   └── repositories/eventRepository.ts # リポジトリインターフェース
├── infrastructure/notion/
│   ├── config/
│   │   ├── constants.ts               # DB ID定数
│   │   └── schemas/eventSchema.ts     # Notionスキーマ定義
│   └── repositories/
│       └── notionEventRepository.ts   # Notion実装
└── services/
    └── eventService.ts                # ビジネスロジック
```

### 主要な実装ポイント

1. **ドメインエンティティ** (`src/domain/entities/event.ts`)
   - 純粋なTypeScriptインターフェース
   - 外部依存関係なし

2. **リポジトリインターフェース** (`src/domain/repositories/eventRepository.ts`)
   - データアクセスの抽象化
   - 実装詳細に依存しない

3. **Notionスキーマ** (`src/infrastructure/notion/config/schemas/eventSchema.ts`)
   - NotionのプロパティとTypeScriptの型のマッピング
   - 型安全性を保証

4. **Notion実装** (`src/infrastructure/notion/repositories/notionEventRepository.ts`)
   - ドメインインターフェースの具体実装
   - NotionからDomainEntityへの変換処理
