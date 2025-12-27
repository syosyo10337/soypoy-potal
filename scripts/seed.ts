/**
 * ローカル開発用シードスクリプト
 *
 * デフォルトの管理者アカウントをデータベースに作成します。
 * 本番環境では実行されないよう保護されています。
 */

import { neonConfig, Pool } from "@neondatabase/serverless";
import { scryptAsync } from "@noble/hashes/scrypt.js";
import { bytesToHex, randomBytes } from "@noble/hashes/utils.js";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";
import { nanoid } from "nanoid";
import ws from "ws";
import { account, user } from "../src/infrastructure/db/schema";

neonConfig.webSocketConstructor = ws;

const DEFAULT_ADMIN = {
  email: "admin@soypoy.local",
  password: "admin1234",
  name: "Admin",
  role: "admin",
} as const;

const scryptConfig = {
  N: 16384,
  r: 16,
  p: 1,
  dkLen: 64,
};

async function hashPassword(password: string): Promise<string> {
  const salt = bytesToHex(randomBytes(16));
  const key = await scryptAsync(password.normalize("NFKC"), salt, {
    N: scryptConfig.N,
    p: scryptConfig.p,
    r: scryptConfig.r,
    dkLen: scryptConfig.dkLen,
    maxmem: 128 * scryptConfig.N * scryptConfig.r * 2,
  });
  return `${salt}:${bytesToHex(key)}`;
}

async function seed() {
  if (process.env.NODE_ENV === "production") {
    console.error("[Seed] ❌ 本番環境ではシードスクリプトを実行できません");
    process.exit(1);
  }

  const databaseUrl = process.env.NETLIFY_DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("NETLIFY_DATABASE_URL environment variable is not set");
  }

  console.log("[Seed] Starting database seed...");

  const pool = new Pool({ connectionString: databaseUrl });
  const db = drizzle(pool);

  try {
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, DEFAULT_ADMIN.email))
      .limit(1);

    if (existingUser.length > 0) {
      console.log(
        `[Seed] ⚠️ 管理者アカウント (${DEFAULT_ADMIN.email}) は既に存在します`,
      );
      return;
    }

    const userId = nanoid();
    const accountId = nanoid();
    const hashedPassword = await hashPassword(DEFAULT_ADMIN.password);
    const now = new Date();

    await db.insert(user).values({
      id: userId,
      email: DEFAULT_ADMIN.email,
      name: DEFAULT_ADMIN.name,
      emailVerified: true,
      role: DEFAULT_ADMIN.role,
      createdAt: now,
      updatedAt: now,
    });

    await db.insert(account).values({
      id: accountId,
      accountId: userId,
      providerId: "credential",
      userId: userId,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    });

    console.log("[Seed] ✅ 管理者アカウントを作成しました:");
    console.log(`       Email: ${DEFAULT_ADMIN.email}`);
    console.log(`       Password: ${DEFAULT_ADMIN.password}`);
    console.log(`       Role: ${DEFAULT_ADMIN.role}`);
  } catch (error) {
    console.error("[Seed] ❌ Seed failed:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

seed()
  .then(() => {
    console.log("[Seed] Seed process completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("[Seed] Seed process failed:", error);
    process.exit(1);
  });
