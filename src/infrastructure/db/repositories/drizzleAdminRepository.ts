import { eq, or } from "drizzle-orm";
import type { AdminUserEntity } from "@/domain/entities";
import { AdminUserRole } from "@/domain/entities";
import type {
  AdminRepository,
  CreateAdminAccountInput,
  CreateAdminInput,
  UpdateAdminInput,
} from "@/domain/repositories/adminRepository";
import { db } from "../index";
import { adminAccount, adminSession, adminUser } from "../schema";

/**
 * DrizzleORMを使用したAdminRepository実装
 */
export class DrizzleAdminRepository implements AdminRepository {
  /**
   * すべての管理者ユーザーを取得
   * Admin と SuperAdmin ロールのみを対象
   */
  async list(): Promise<AdminUserEntity[]> {
    const users = await db
      .select({
        id: adminUser.id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
        createdAt: adminUser.createdAt,
        updatedAt: adminUser.updatedAt,
      })
      .from(adminUser)
      .where(
        or(
          eq(adminUser.role, AdminUserRole.Admin),
          eq(adminUser.role, AdminUserRole.SuperAdmin),
        ),
      );

    return users.map(this.toDomainEntity);
  }

  /**
   * IDで管理者ユーザーを取得
   */
  async findById(id: string): Promise<AdminUserEntity | undefined> {
    const [user] = await db
      .select({
        id: adminUser.id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
        createdAt: adminUser.createdAt,
        updatedAt: adminUser.updatedAt,
      })
      .from(adminUser)
      .where(eq(adminUser.id, id))
      .limit(1);

    return user ? this.toDomainEntity(user) : undefined;
  }

  /**
   * メールアドレスで管理者ユーザーを検索
   */
  async findByEmail(email: string): Promise<AdminUserEntity | undefined> {
    const [user] = await db
      .select({
        id: adminUser.id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
        createdAt: adminUser.createdAt,
        updatedAt: adminUser.updatedAt,
      })
      .from(adminUser)
      .where(eq(adminUser.email, email))
      .limit(1);

    return user ? this.toDomainEntity(user) : undefined;
  }

  /**
   * 管理者ユーザーを作成
   */
  async createUser(input: CreateAdminInput): Promise<AdminUserEntity> {
    await db.insert(adminUser).values({
      id: input.id,
      email: input.email,
      name: input.name,
      emailVerified: input.emailVerified ?? true,
      role: input.role,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });

    const created = await this.findById(input.id);
    if (!created) {
      throw new Error(`Failed to create admin user with id ${input.id}`);
    }

    return created;
  }

  /**
   * 管理者アカウント（認証情報）を作成
   */
  async createAccount(input: CreateAdminAccountInput): Promise<void> {
    await db.insert(adminAccount).values({
      id: input.id,
      accountId: input.accountId,
      providerId: input.providerId,
      userId: input.userId,
      password: input.password,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });
  }

  /**
   * 管理者ユーザー情報を更新
   */
  async update(id: string, input: UpdateAdminInput): Promise<AdminUserEntity> {
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (input.name !== undefined) updateData.name = input.name;
    if (input.email !== undefined) updateData.email = input.email;
    if (input.role !== undefined) updateData.role = input.role;

    await db.update(adminUser).set(updateData).where(eq(adminUser.id, id));

    const updated = await this.findById(id);
    if (!updated) {
      throw new Error(`Admin user with id ${id} not found after update`);
    }

    return updated;
  }

  /**
   * 管理者ユーザーを削除
   * カスケード削除により、関連するsessionとaccountも自動削除される
   */
  async delete(id: string): Promise<void> {
    await db.delete(adminUser).where(eq(adminUser.id, id));
  }

  /**
   * ユーザーIDでアカウントのパスワードを取得
   */
  async findPasswordByUserId(userId: string): Promise<string | null> {
    const [account] = await db
      .select({ password: adminAccount.password })
      .from(adminAccount)
      .where(eq(adminAccount.userId, userId))
      .limit(1);

    return account?.password ?? null;
  }

  /**
   * ユーザーIDでパスワードを更新
   */
  async updatePassword(userId: string, hashedPassword: string): Promise<void> {
    await db
      .update(adminAccount)
      .set({ password: hashedPassword, updatedAt: new Date() })
      .where(eq(adminAccount.userId, userId));
  }

  /**
   * ユーザーIDですべてのセッションを削除
   */
  async deleteAllSessions(userId: string): Promise<void> {
    await db.delete(adminSession).where(eq(adminSession.userId, userId));
  }

  /**
   * Drizzleの管理者データをドメインエンティティに変換
   */
  private toDomainEntity(user: {
    id: string;
    name: string;
    email: string;
    role: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): AdminUserEntity {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: (user.role ?? AdminUserRole.Admin) as AdminUserRole,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
