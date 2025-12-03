/**
 * データベースマイグレーション実行スクリプト
 *
 * Netlifyのビルド時に自動的に実行され、
 * 各環境（production/preview）のデータベースブランチに
 * マイグレーションを適用します
 */

import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import ws from "ws";

// WebSocketの設定（ローカル開発用）
neonConfig.webSocketConstructor = ws;

async function runMigrations() {
  const databaseUrl = process.env.NETLIFY_DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("NETLIFY_DATABASE_URL environment variable is not set");
  }

  console.log("[Migration] Starting database migration...");
  console.log(
    `[Migration] Environment: ${process.env.APP_ENV || process.env.CONTEXT || "development"}`,
  );

  const pool = new Pool({ connectionString: databaseUrl });
  const db = drizzle(pool);

  try {
    console.log("[Migration] Applying migrations from ./drizzle folder...");
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("[Migration] ✅ Migrations applied successfully!");
  } catch (error) {
    console.error("[Migration] ❌ Migration failed:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

runMigrations()
  .then(() => {
    console.log("[Migration] Migration process completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("[Migration] Migration process failed:", error);
    process.exit(1);
  });
