# SOY-POY Portal

SOY-POYのwebサイトプロジェクトです。

## 技術スタック

- **フロントエンド**
  - [Next.js](https://nextjs.org) - Reactフレームワーク
  - [TypeScript](https://www.typescriptlang.org/) - 型安全なJavaScript
  - [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストCSSフレームワーク
  - [Biome](https://biomejs.dev/) - 高速なJavaScript/TypeScriptツールチェーン
  - [pnpm](https://pnpm.io/) - 高速なパッケージマネージャー


### Biomeについて

[Biome](https://biomejs.dev/)は、Rustで書かれた高速なJavaScript/TypeScriptツールチェーンです。このプロジェクトでは、コードの品質を保つために、linterとformatterとして利用しています。

#### 使用方法

- コードの静的解析（lint）:
```bash
pnpm lint        # コードの静的解析を実行
pnpm lint:fix    # 自動修正可能な問題を修正
```

- コードのフォーマット:
```bash
pnpm format      # コードのフォーマットを実行（--writeオプション付きで自動修正）
```

#### 設定

プロジェクトのルートディレクトリにある`biome.json`で、lintとformatのルールを設定しています。詳細な設定は[Biomeの公式ドキュメント](https://biomejs.dev/linter/rules/)を参照してください。


## 環境構築

### 前提条件

- [VSCode](https://code.visualstudio.com/)
- [Docker](https://www.docker.com/)
- [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) VSCode拡張機能

### 初回セットアップ

1. リポジトリをクローン
```bash
git clone [リポジトリURL]
cd soypoy-portal
```

2. VSCodeでプロジェクトを開く
```bash
code .
```

3. VSCodeの通知から「Reopen in Container」を選択
   - または、コマンドパレット（Cmd/Ctrl + Shift + P）から「Dev Containers: Reopen in Container」を選択

4. コンテナのビルドと起動が完了するまで待機
   - 初回は依存関係のインストールに時間がかかる場合があります

## 開発サーバーの起動
dev containerを経由せずにコンテナを起動する場合は、以下のコマンドを利用します。

```bash
./bin/dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、アプリケーションが表示されます。

## 開発環境の停止

開発環境を停止するには、以下のいずれかの方法を使用できます：

1. VSCodeのコマンドパレット（Mac: `Cmd + Shift + P`、Windows: `Ctrl + Shift + P`）を開き、`Dev Containers: Reopen Folder Locally` を選択

2. ターミナルから直接停止する場合：
```bash
docker compose down
```

### 開発コマンド
プロジェクトルートの`bin`ディレクトリには、ローカル環境からDockerコンテナ内のコマンドを実行するためのラッパースクリプトが格納されています。

詳細は[bin/README.md](bin/README.md)を参照してください。
