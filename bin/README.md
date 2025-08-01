# ローカル開発用コマンド

このディレクトリには、ローカル環境からDockerコンテナ内のコマンドを実行するためのラッパースクリプトが格納されています。
これらのスクリプトを使用することで、ローカル環境から直接Dockerコンテナ内のコマンドを実行できます。

## 利用可能なコマンド

- `./bin/pnpm`: コンテナ内でpnpmコマンドを実行します
- `./bin/node`: コンテナ内でnodeコマンドを実行します
- `./bin/dev`: コンテナ内で開発サーバーを起動します
- `./bin/lint`: コンテナ内でコードの静的解析を実行します
- `./bin/lint:fix`: コンテナ内で自動修正可能な問題を修正します
- `./bin/format`: コンテナ内でコードのフォーマットを実行します
- `./bin/check`: コンテナ内でtsc・lint:fix・formatを順次実行します

## 使用方法

各コマンドは以下のように実行します：

```bash
# pnpmコマンドの実行
./bin/pnpm install
./bin/pnpm add [パッケージ名]

# nodeコマンドの実行
./bin/node [スクリプト名]

# 開発サーバーの起動
./bin/dev

# コードの静的解析とフォーマット
./bin/lint        # コードの静的解析を実行
./bin/lint:fix    # 自動修正可能な問題を修正
./bin/format      # コードのフォーマットを実行
./bin/check       # tsc・lint:fix・formatをまとめて実行
```

## 注意事項

- コマンドを実行する前に、Dockerコンテナが起動していることを確認してください
- コマンドには実行権限が必要です（`chmod +x ./bin/*`で付与できます）
- これらのコマンドは、ローカル環境からDockerコンテナ内のコマンドを実行するためのラッパーです
