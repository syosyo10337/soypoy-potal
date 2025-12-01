# Cloudinary画像アップロード セットアップガイド

## 📋 概要

このプロジェクトでは、画像を**Cloudinary**に保存し、そのURLをNeon PostgreSQLに保存します。

```
User Upload → Cloudinary (画像保存) → URL → Neon DB (URLのみ保存)
```

## 🚀 セットアップ手順

### Step 1: Cloudinaryアカウント作成

1. https://cloudinary.com/users/register_free にアクセス
2. 無料アカウント登録 (クレジットカード不要)
3. ダッシュボードから以下の情報を取得:
   - Cloud Name
   - API Key
   - API Secret

### Step 2: パッケージインストール

```bash
pnpm add cloudinary next-cloudinary
```

**既にインストール済みです!** パッケージは以下の用途で使用します:
- `cloudinary`: サーバーサイドアップロード
- `next-cloudinary`: クライアントサイド画像表示最適化

### Step 3: 環境変数設定

`.env.local` ファイルを作成し、以下を追加:

```env
# Cloudinary (画像ストレージ)
# Server-side upload (cloudinary package)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Client-side display (next-cloudinary package)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
```

**テンプレートファイル:** プロジェクトルートの `env.local` を参照してください。

⚠️ **本番環境 (Netlify):**
- Netlify Dashboard → Site settings → Environment variables
- 上記3つの環境変数を追加

### Step 4: Cloudinary統合を有効化

**既に実装済みです!** 

`src/services/eventService.ts` が以下の処理を実行します:

```typescript
// ✅ 既に実装済み
async createEvent(input: ...) {
  // 新規画像の場合はCloudinaryへアップロード
  if (isNewImage(thumbnail) && thumbnail.type === "new") {
    thumbnailUrl = await uploadImageToCloudinary({ file: thumbnail.file });
  } else {
    thumbnailUrl = extractExistingImageUrl(thumbnail);
  }
  
  // URLをDBに保存
  return await this.repository.create({ thumbnail: thumbnailUrl, ... });
}
```

**アーキテクチャの正しさ:**
- ✅ Schema層: バリデーション + 型変換のみ
- ✅ Storage層: Cloudinaryアップロード
- ✅ Service層: 両者をオーケストレーション

詳細は `/app/docs/architecture-responsibilities.md` を参照してください。

### Step 5: 動作確認

1. 開発サーバー起動:
   ```bash
   docker compose up -d
   ```

2. Admin画面でイベント作成:
   - http://localhost:3000/admin/events/create
   - 画像をアップロード
   - 保存

3. Cloudinaryダッシュボードで確認:
   - https://cloudinary.com/console/media_library
   - `soypoy-events` フォルダに画像が保存されているか確認

## 📊 現在のアーキテクチャ

### データベーススキーマ (変更不要)

```sql
-- ✅ URLのみ保存 (バイナリは保存しない)
CREATE TABLE events (
  id TEXT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  thumbnail TEXT,  -- Cloudinary URL
  -- 他のカラム...
);
```

### TypeScript型 (変更不要)

```typescript
export interface EventEntity {
  id: string;
  thumbnail?: string;  // "https://res.cloudinary.com/..."
}
```

### データフロー

```typescript
// 1. フォーム送信
ImageFieldValue = {
  type: "new",
  file: File  // ブラウザのFileオブジェクト
}

// 2. Service層で変換
const url = await extractImageUrl(imageFieldValue);
// url = "https://res.cloudinary.com/.../image.jpg"

// 3. Repository層でDB保存
await repository.create({
  thumbnail: url  // string型
});
```

## 🎯 メリット

### ✅ パフォーマンス
- **DBサイズ**: URLのみ (数十バイト) vs バイナリ (数MB)
- **クエリ速度**: 高速 (インデックス可能)
- **バックアップ**: 軽量

### ✅ スケーラビリティ
- **CDN配信**: グローバルに高速配信
- **自動最適化**: WebP/AVIF変換
- **リサイズ**: URL経由で動的リサイズ可能

### ✅ コスト
- **Cloudinary無料枠**: 25GB ストレージ、25GB/月 帯域
- **Neon無料枠**: 0.5GB (画像なしでも十分)

### ✅ メンテナンス
- **画像変換**: Cloudinaryが自動処理
- **キャッシュ**: CDNが自動管理
- **バックアップ**: Cloudinaryが管理

## 🔒 セキュリティ

### 実装済み
- ✅ ファイルサイズ制限 (5MB)
- ✅ MIMEタイプ検証 (JPEG/PNG)
- ✅ Zodバリデーション

### 推奨追加設定

**Cloudinaryダッシュボードで設定:**
1. Settings → Security
2. **Allowed fetch domains**: 自ドメインのみ許可
3. **Upload presets**: Unsigned uploadを無効化

**本番環境:**
- 署名付きアップロードを使用 (API_SECRETが必要)

## 📈 使用量モニタリング

### Cloudinaryダッシュボード
- https://cloudinary.com/console/usage
- ストレージ使用量
- 帯域幅使用量
- 変換クレジット

### アラート設定
- Settings → Usage alerts
- 無料枠の80%で通知

## 🔧 トラブルシューティング

### エラー: "Cloudinary upload failed"

**原因:**
- 環境変数が設定されていない
- API Keyが間違っている

**解決:**
```bash
# 環境変数を確認
echo $CLOUDINARY_CLOUD_NAME
echo $CLOUDINARY_API_KEY

# 再起動
docker compose restart
```

### エラー: "Invalid Cloudinary URL"

**原因:**
- URLフォーマットが想定と異なる

**解決:**
- `deleteImageFromCloudinary` の正規表現を確認
- CloudinaryのURLフォーマットを確認

## 🌐 代替オプション

現在はCloudinaryを推奨していますが、将来的に以下も検討可能:

| サービス | 無料枠 | 特徴 |
|---------|-------|-----|
| **Cloudinary** | 25GB | ✅ 推奨 |
| Uploadthing | 2GB | Next.js専用 |
| AWS S3 | 5GB (12ヶ月) | 大規模向け |
| Vercel Blob | 従量課金 | Vercel専用 |

## 📚 参考リンク

- [Cloudinary公式ドキュメント](https://cloudinary.com/documentation)
- [Next.js + Cloudinary](https://next.cloudinary.dev/)
- [画像最適化ガイド](https://cloudinary.com/documentation/image_optimization)

