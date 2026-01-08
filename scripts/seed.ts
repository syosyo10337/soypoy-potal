/**
 * ローカル開発用シードスクリプト
 *
 * デフォルトの管理者アカウントをデータベースに作成します。
 * 本番環境では実行されないよう保護されています。
 */

import { neonConfig, Pool } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";
import { nanoid } from "nanoid";
import ws from "ws";
import { hashPassword } from "../src/infrastructure/crypto/password";
import { adminAccount, adminUser } from "../src/infrastructure/db/schema";

neonConfig.webSocketConstructor = ws;

const DEFAULT_ADMIN = {
  email: "admin@soypoy.local",
  password: "admin1234",
  name: "Admin",
  role: "admin",
} as const;

const DEFAULT_SUPER_ADMIN = {
  email: "super@soypoy.local",
  password: "SuperAdmin2024!",
  name: "Super Admin",
  role: "super_admin",
} as const;

interface AdminConfig {
  email: string;
  password: string;
  name: string;
  role: "admin" | "super_admin";
}

async function createAdminUser(
  db: ReturnType<typeof drizzle>,
  adminConfig: AdminConfig,
) {
  const existingUser = await db
    .select()
    .from(adminUser)
    .where(eq(adminUser.email, adminConfig.email))
    .limit(1);

  if (existingUser.length > 0) {
    console.log(`[Seed] ⚠️ アカウント (${adminConfig.email}) は既に存在します`);
    return;
  }

  const userId = nanoid();
  const accountId = nanoid();
  const hashedPassword = await hashPassword(adminConfig.password);
  const now = new Date();

  await db.insert(adminUser).values({
    id: userId,
    email: adminConfig.email,
    name: adminConfig.name,
    emailVerified: true,
    role: adminConfig.role,
    createdAt: now,
    updatedAt: now,
  });

  await db.insert(adminAccount).values({
    id: accountId,
    accountId: userId,
    providerId: "credential",
    userId: userId,
    password: hashedPassword,
    createdAt: now,
    updatedAt: now,
  });

  console.log("[Seed] ✅ アカウントを作成しました:");
  console.log(`       Email: ${adminConfig.email}`);
  console.log(`       Password: ${adminConfig.password}`);
  console.log(`       Role: ${adminConfig.role}`);
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
    await createAdminUser(db, DEFAULT_ADMIN);
    await createAdminUser(db, DEFAULT_SUPER_ADMIN);
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
