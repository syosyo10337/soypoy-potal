<!-- 14be19d1-0a95-445a-8130-27fe9b1b8d72 f4a54759-1d7e-476f-83da-54f79019731b -->
# イベント一覧ページ実装計画

## 概要

デザイン案に基づき、月別イベント一覧ページを実装します。PC/SP対応のレスポンシブデザインで、月ナビゲーション、イベントリスト、通常営業日表示を含みます。

## 実装ステップ

### 1. バックエンド層の拡張（Domain/Service/Infrastructure）

#### 1-1. ClosedDayエンティティの定義と実装方針

- `src/domain/entities/closedDay/index.ts`を新規作成
                                - `ClosedDayEntity`インターフェース定義
    ```typescript
    /**
     * 休業日エンティティ
     * ドメイン層の休業日を表す
     */
    export interface ClosedDayEntity {
      id: string;
      /**
       * 日付文字列
       * YYYY-MM-DD形式（ISO8601の日付部分のみ）
       * 例: "2025-08-16"
       */
      date: string;
    }
    ```

                                - 実装方針:
                                                                - 最小限の情報のみ保持（idとdateのみ）
                                                                - dateはYYYY-MM-DD形式の文字列（時刻情報なし）
                                                                - EventEntityとは別のエンティティとして定義（正規化）
                                                                - バリデーションはRepository層で実施（日付形式の検証）
- `src/domain/entities/index.ts`にエクスポート追加
                                - `export type { ClosedDayEntity } from "./closedDay";`
                                - EventEntityと同様のパターンでエクスポート

#### 1-2. ClosedDayRepositoryインターフェースの定義

- `src/domain/repositories/closedDayRepository.ts`を新規作成
                                - `ClosedDayRepository`インターフェース定義
                                - `listByMonth(year: number, month: number): Promise<ClosedDayEntity[]>`メソッド
                                - EventRepositoryと同様のパターンで定義

#### 1-3. DBスキーマ拡張

- `src/infrastructure/db/schema.ts`に`closed_days`テーブルを追加
  ```typescript
  export const closedDays = pgTable("closed_days", {
    id: text().primaryKey(),
    date: varchar({ length: 255 }).notNull(), // YYYY-MM-DD形式
  });
  ```


#### 1-4. マイグレーション実行

- マイグレーションファイルを生成: `pnpm drzl:gen`
- 生成されたマイグレーションファイルを確認（`drizzle/`ディレクトリ）
- マイグレーションを実行: `pnpm drzl:migrate`
- マイグレーション手順:

                                1. `src/infrastructure/db/schema.ts`に`closed_days`テーブル定義を追加
                                2. `pnpm drzl:gen`でマイグレーションファイル生成
                                3. 生成されたSQLファイルを確認（`drizzle/XXXX_*.sql`）
                                4. `pnpm drzl:migrate`でデータベースに適用

#### 1-5. DrizzleClosedDayRepository実装

- `src/infrastructure/db/repositories/drizzleClosedDayRepository.ts`を新規作成
- `ClosedDayRepository`インターフェースを実装
- 実装方針:
                                - `DrizzleEventRepository`と同様の構造で実装
                                - `toDomainEntity`メソッドでDrizzleデータを`ClosedDayEntity`に変換
                                - `listByMonth`で指定月の休業日を取得
                                                                - 日付文字列（YYYY-MM-DD形式）を`dateTimeFromISO`でパース
                                                                - 年と月でフィルタリング（`year === targetYear && month === targetMonth`）
                                - エラーハンドリング: 無効な日付形式の場合はスキップまたはログ出力

#### 1-6. ClosedDayService実装

- `src/services/closedDayService.ts`を新規作成
- `getClosedDaysByMonth(year: number, month: number): Promise<ClosedDayEntity[]>`メソッド
- `DrizzleClosedDayRepository`を依存注入で使用
- EventServiceと同様のパターンで実装

#### 1-7. EventRepositoryインターフェース拡張

- `src/domain/repositories/eventRepository.ts`に`listByMonth(year: number, month: number): Promise<EventEntity[]>`メソッドを追加
- PublicationStatusでフィルタリング（Publishedのみ）はRepository実装で行う

#### 1-2. DrizzleEventRepository実装

- `src/infrastructure/db/repositories/drizzleEventRepository.ts`に`listByMonth`を実装
- 月とPublicationStatus（Published）でフィルタリング
- 日付は`date`カラムの文字列をパースして比較

#### 1-3. EventService拡張

- `src/services/eventService.ts`に`getEventsByMonth(year: number, month: number): Promise<EventEntity[]>`メソッドを追加

#### 1-4. tRPCルーター拡張

- `src/infrastructure/trpc/routers/events.ts`に`listByMonth`エンドポイントを追加
- 入力スキーマ: `z.object({ year: z.number(), month: z.number() })`
- PublicationStatusはPublishedのみを返す

### 2. ユーティリティ関数の実装

#### 2-1. テキストtruncate関数

- `src/utils/text.ts`を新規作成
- `truncate(text: string, maxLength: number): string`関数を実装（50文字制限）

#### 2-2. 日付ユーティリティ拡張

- `src/utils/date.ts`に以下を追加:
                                - `formatMonthDay(dateString: string): string` - "MM/DD Day"形式（例: "12/25 Sat"）
                                - `getWeekendDatesInMonth(year: number, month: number): Array<{ date: string, dayOfWeek: string }>` - 指定月の金・土・日を取得
                                - `getMonthName(year: number, month: number, locale: 'ja' | 'en'): string` - 月名取得（"August"など）

### 3. フロントエンドコンポーネント実装

#### 3-1. ページコンポーネント

- `src/app/(user)/events/page.tsx`を書き換え
- URLパラメータ`?month=YYYY-MM`から月を取得（デフォルトは現在月）
- Suspenseでラップし、スケルトンローディングを実装
- クライアントコンポーネント`EventListPageContent`に分離

#### 3-2. EventPageHeader

- `src/app/(user)/events/_components/EventPageHeader.tsx`を新規作成
- SOYPOYロゴとナビゲーションリンクを表示

#### 3-3. MonthNavigation

- `src/app/(user)/events/_components/MonthNavigation.tsx`を新規作成
- `MonthNavigationPreviousMonthButton` - 前月ボタン
- `MonthNavigationNextMonthButton` - 次月ボタン
- `MonthNavigationMonthText` - 年月表示（2025 / 08 / August）
- URLパラメータを更新して月を切り替え

#### 3-4. EventList

- `src/app/(user)/events/_components/EventList.tsx`を新規作成
- `EventListContainer` - リストコンテナ
- `EventListItem` - 既存をデザイン案に合わせて再実装
                                - `EventListItemDate` - "MM/DD Day"形式
                                - `EventListItemImage` - サムネイル画像
                                - `EventListItemInfo` - イベント情報
                                - `EventListItemTitle` - タイトル（50文字でtruncate）
                                - `PickUpLabel` - "PICK UP EVENT!"ラベル（条件付き表示）
- `EventListItemSkeleton` - スケルトンローディング用
- `EventListSeparator` - 区切り線（shadcn Separator使用）

#### 3-5. RegularHoursAnnouncement

- `src/app/(user)/events/_components/RegularHoursAnnouncement.tsx`を新規作成
- `RegularHoursAnnouncementTitle` - "X月の通常営業日"
- `RegularHoursAnnouncementDescription` - 説明文
- `RegularHoursAnnouncementContent` - 日付リスト（グリッド表示）
- ロジック: 指定月の金・土・日から、イベントがある日を除外して表示

#### 3-6. スケルトンローディング

- `src/app/(user)/events/_components/EventListSkeleton.tsx`を新規作成
- `EventListItemSkeleton`を複数表示

### 4. データ取得と状態管理

#### 4-1. クライアント側データ取得

- tRPCクライアントを使用して`listByMonth`を呼び出し
- 月パラメータをURLから取得してAPIリクエストに渡す

#### 4-2. 通常営業日の計算

- 指定月の金・土・日を取得
- イベントリストの日付と比較し、イベントがない日のみを通常営業日として表示

## 技術的な考慮事項

### レスポンシブデザイン

- Tailwindの`sm`/`md`/`lg`/`xl`/`2xl`ブレークポイントを使用
- `md`/`lg`がSP/PCの境界

### パフォーマンス

- Suspenseでストリーミングレンダリング
- 画像はNext.js Imageコンポーネントを使用

### アクセシビリティ

- セマンティックHTML使用
- 適切なARIAラベル

## ファイル構成

```
src/
├── app/(user)/events/
│   ├── page.tsx (書き換え)
│   └── _components/
│       ├── EventPageHeader.tsx (新規)
│       ├── MonthNavigation.tsx (新規)
│       ├── EventList.tsx (新規、クライアントコンポーネント)
│       ├── EventListItem.tsx (書き換え)
│       ├── RegularHoursAnnouncement.tsx (新規)
│       ├── ClosedDaysAnnouncement.tsx (新規)
│       ├── BusinessHoursSection.tsx (新規、仮名)
│       └── EventListSkeleton.tsx (新規)
├── domain/
│   ├── entities/
│   │   └── closedDay/
│   │       └── index.ts (新規)
│   └── repositories/
│       ├── eventRepository.ts (拡張)
│       └── closedDayRepository.ts (新規)
├── infrastructure/
│   ├── db/
│   │   ├── schema.ts (拡張、closed_daysテーブル追加)
│   │   └── repositories/
│   │       ├── drizzleEventRepository.ts (拡張)
│   │       └── drizzleClosedDayRepository.ts (新規)
│   └── trpc/
│       ├── context.ts (拡張、closedDayService追加)
│       ├── router.ts (拡張、closedDaysルーター追加)
│       └── routers/
│           ├── events.ts (拡張)
│           └── closedDays.ts (新規)
├── services/
│   ├── eventService.ts (拡張)
│   └── closedDayService.ts (新規)
└── utils/
    ├── date.ts (拡張)
    └── text.ts (新規)
```

## 実装順序

1. **バックエンド層の拡張（Domain → Infrastructure → Service → tRPC）**

                                                - ClosedDayエンティティとRepositoryインターフェース定義
                                                - DBスキーマ拡張（closed_daysテーブル追加）
                                                - マイグレーション実行（`pnpm drzl:gen` → `pnpm drzl:migrate`）
                                                - DrizzleClosedDayRepository実装
                                                - ClosedDayService実装
                                                - EventRepository/Service拡張（listByMonth追加）
                                                - tRPCルーター拡張（events.listByMonth, closedDays.listByMonth）

2. **ユーティリティ関数の実装**

                                                - truncate関数
                                                - 日付ユーティリティ拡張

3. **フロントエンドコンポーネント（下位コンポーネントから順に）**

                                                - EventPageHeader
                                                - MonthNavigation
                                                - EventListItem関連
                                                - RegularHoursAnnouncement
                                                - ClosedDaysAnnouncement
                                                - ScheduleAnnouncement
                                                - EventListSkeleton

4. **ページコンポーネントと統合**

                                                - EventListコンポーネント（2つのAPIを並列取得）
                                                - page.tsxでSuspense設定

5. **レスポンシブ調整とスタイリング**

### To-dos

- [ ] EventRepositoryインターフェースにlistByMonthメソッドを追加し、DrizzleEventRepositoryで実装（月フィルタリングとPublishedステータスフィルタリング）
- [ ] EventServiceにgetEventsByMonthメソッドを追加
- [ ] tRPCルーターにlistByMonthエンドポイントを追加（year/monthパラメータを受け取る）
- [ ] src/utils/text.tsを新規作成し、truncate関数を実装（50文字制限）
- [ ] src/utils/date.tsにformatMonthDay、getWeekendDatesInMonth、getMonthName関数を追加
- [ ] EventPageHeaderコンポーネントを実装（SOYPOYロゴとナビゲーション）
- [ ] MonthNavigationコンポーネントを実装（前月/次月ボタン、年月表示、URLパラメータ管理）
- [ ] EventListコンポーネント群を実装（EventListContainer、EventListItem、EventListItemSkeleton、EventListSeparator）
- [ ] RegularHoursAnnouncementコンポーネントを実装（通常営業日の計算ロジック含む）
- [ ] page.tsxを書き換え、Suspenseでラップし、URLパラメータから月を取得してtRPCでデータ取得、全コンポーネントを統合
- [ ] レスポンシブデザインの調整（md/lgブレークポイント、SPでのカテゴリラベル非表示など）