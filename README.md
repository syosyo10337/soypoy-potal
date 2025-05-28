# Soypoy Portal

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 技術スタック

- **フロントエンド**
  - [Next.js](https://nextjs.org) - Reactフレームワーク
  - [TypeScript](https://www.typescriptlang.org/) - 型安全なJavaScript
  - [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストCSSフレームワーク
  - [Biome](https://biomejs.dev/) - 高速なJavaScript/TypeScriptツールチェーン

- **開発環境**
  - [Docker](https://www.docker.com/) - コンテナ化
  - [Dev Container](https://code.visualstudio.com/docs/devcontainers/containers) - VSCodeの開発コンテナ機能
  - [pnpm](https://pnpm.io/) - 高速なパッケージマネージャー

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

コンテナ内で開発サーバーを起動するには、以下のコマンドを実行します：

```bash
./bin/dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、アプリケーションが表示されます。

## ローカル開発用コマンド
dev containerを活用せず、localの環境でbiome LSPなどを起動して開発する場合には、
```
.bin/bev
```

プロジェクトルートの`bin`ディレクトリには、ローカル環境からDockerコンテナ内のコマンドを実行するためのラッパースクリプトが格納されています。

詳細は[bin/README.md](bin/README.md)を参照してください。
