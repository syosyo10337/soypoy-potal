# syntax=docker/dockerfile:1
# cf. https://pnpm.io/docker
FROM node:24.10.0-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
WORKDIR /app
# Gitとssh関連ツールをインストール
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        git \
        openssh-client \
    && rm -rf /var/lib/apt/lists/*

# == 依存関係ステージ ==
FROM base AS deps

COPY pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm fetch --frozen-lockfile
COPY package.json ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --offline

# === 開発ステージ ===
FROM base AS dev

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
ENV NODE_ENV=development
CMD ["pnpm", "dev"]