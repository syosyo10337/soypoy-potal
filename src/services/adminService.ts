import { nanoid } from "nanoid";
import type { AdminUserEntity } from "@/domain/entities";
import type {
  AdminRepository,
  CreateAdminInput as RepoCreateAdminInput,
} from "@/domain/repositories/adminRepository";
import type {
  ChangePasswordInput,
  CreateAdminInput,
  UpdateAdminInput,
} from "@/domain/validation";
import {
  generateTempPassword,
  hashPassword,
  verifyPassword,
} from "@/infrastructure/crypto/password";

/**
 * パスワードリセット結果
 */
export interface ResetPasswordResult {
  tempPassword: string;
  message: string;
}

/**
 * 管理者サービス
 * 管理者ユーザーに関するビジネスロジックを担当
 */
export class AdminService {
  constructor(private repository: AdminRepository) {}

  /**
   * すべての管理者ユーザーを取得
   */
  async getAllAdmins(): Promise<AdminUserEntity[]> {
    return await this.repository.list();
  }

  /**
   * IDで管理者ユーザーを取得
   */
  async getAdminById(id: string): Promise<AdminUserEntity | null> {
    const admin = await this.repository.findById(id);
    return admin ?? null;
  }

  /**
   * 管理者ユーザーを作成
   */
  async createAdmin(input: CreateAdminInput): Promise<AdminUserEntity> {
    // メールアドレスの重複チェック
    const existingUser = await this.repository.findByEmail(input.email);
    if (existingUser) {
      throw new Error("このメールアドレスは既に使用されています");
    }

    const userId = nanoid();
    const accountId = nanoid();
    const hashedPassword = await hashPassword(input.password);
    const now = new Date();

    // ユーザーを作成（Repository用の型に変換）
    const repoInput: RepoCreateAdminInput = {
      id: userId,
      email: input.email,
      name: input.name,
      emailVerified: true,
      role: input.role,
      createdAt: now,
      updatedAt: now,
    };
    const user = await this.repository.createUser(repoInput);

    // アカウント（認証情報）を作成
    await this.repository.createAccount({
      id: accountId,
      accountId: userId,
      providerId: "credential",
      userId: userId,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    });

    return user;
  }

  /**
   * 管理者ユーザー情報を更新
   */
  async updateAdmin(
    id: string,
    input: UpdateAdminInput,
  ): Promise<AdminUserEntity> {
    // メールアドレスを変更する場合は重複チェック
    if (input.email) {
      const existingUser = await this.repository.findByEmail(input.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error("このメールアドレスは既に使用されています");
      }
    }

    return await this.repository.update(id, input);
  }

  /**
   * 管理者ユーザーを削除
   */
  async deleteAdmin(id: string, currentUserId: string): Promise<void> {
    // 自分自身の削除を防止
    if (id === currentUserId) {
      throw new Error("自分自身を削除することはできません");
    }

    await this.repository.delete(id);
  }

  /**
   * パスワードを変更
   */
  async changePassword(
    userId: string,
    input: ChangePasswordInput,
  ): Promise<{ success: boolean; message: string }> {
    // 現在のパスワードを取得
    const currentHashedPassword =
      await this.repository.findPasswordByUserId(userId);

    if (!currentHashedPassword) {
      throw new Error("アカウント情報が見つかりません");
    }

    // 現在のパスワードを検証
    const isValid = await verifyPassword(
      input.currentPassword,
      currentHashedPassword,
    );

    if (!isValid) {
      throw new Error("現在のパスワードが正しくありません");
    }

    // 新しいパスワードをハッシュ化して更新
    const newHashedPassword = await hashPassword(input.newPassword);
    await this.repository.updatePassword(userId, newHashedPassword);

    return { success: true, message: "パスワードを変更しました" };
  }

  /**
   * パスワードをリセット（SuperAdmin用）
   */
  async resetPassword(
    userId: string,
    currentUserId: string,
  ): Promise<ResetPasswordResult> {
    // 自分自身のパスワードリセットを防止
    if (userId === currentUserId) {
      throw new Error(
        "自分自身のパスワードはリセットできません。パスワード変更画面をご利用ください。",
      );
    }

    // 一時パスワードを生成
    const tempPassword = generateTempPassword();
    const hashedPassword = await hashPassword(tempPassword);

    // パスワードを更新
    await this.repository.updatePassword(userId, hashedPassword);

    // すべてのセッションを削除
    await this.repository.deleteAllSessions(userId);

    return {
      tempPassword,
      message:
        "パスワードをリセットしました。この一時パスワードをユーザーに伝えてください。",
    };
  }
}
