FROM node:20-alpine AS base

# 依存関係インストール用のステージ
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# pnpmインストール
RUN corepack enable && corepack prepare pnpm@latest --activate

# 依存関係のインストール
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# ビルド用のステージ
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ビルド実行
RUN npm run build

# 実行用のステージ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# 非rootユーザーの設定
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# キャッシュディレクトリを適切に設定
RUN mkdir .next
RUN chown nextjs:nodejs .next

# ビルドしたアプリケーションをコピー
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
