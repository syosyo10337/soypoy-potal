import type { AdminUserEntity, AdminUserRole } from "../entities";

/**
 * 管理者作成用の入力データ（Repository層）
 *
 * Service層で生成される技術的詳細を含む：
 * - id: Service層で生成
 * - createdAt/updatedAt: Service層で生成
 * - emailVerified: Service層で設定
 */
export interface CreateAdminInput {
  id: string;
  email: string;
  name: string;
  role: AdminUserRole;
  emailVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 管理者更新用の入力データ（Repository層）
 */
export interface UpdateAdminInput {
  name?: string;
  email?: string;
  role?: AdminUserRole;
}

/**
 * 管理者アカウント作成用の入力データ（Repository層）
 *
 * Service層で生成される技術的詳細を含む：
 * - id: Service層で生成
 * - password: Service層でハッシュ化済み
 * - createdAt/updatedAt: Service層で生成
 */
export interface CreateAdminAccountInput {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 管理者リポジトリインターフェース
 * 管理者ユーザーとアカウントのデータアクセスを抽象化
 */
export interface AdminRepository {
  /**
   * すべての管理者ユーザーを取得
   */
  list(): Promise<AdminUserEntity[]>;

  /**
   * IDで管理者ユーザーを取得
   */
  findById(id: string): Promise<AdminUserEntity | undefined>;

  /**
   * メールアドレスで管理者ユーザーを検索
   */
  findByEmail(email: string): Promise<AdminUserEntity | undefined>;

  /**
   * 管理者ユーザーを作成
   */
  createUser(input: CreateAdminInput): Promise<AdminUserEntity>;

  /**
   * 管理者アカウント（認証情報）を作成
   */
  createAccount(input: CreateAdminAccountInput): Promise<void>;

  /**
   * 管理者ユーザー情報を更新
   */
  update(id: string, input: UpdateAdminInput): Promise<AdminUserEntity>;

  /**
   * 管理者ユーザーを削除
   */
  delete(id: string): Promise<void>;

  /**
   * ユーザーIDでアカウントのパスワードを取得
   */
  findPasswordByUserId(userId: string): Promise<string | null>;

  /**
   * ユーザーIDでパスワードを更新
   */
  updatePassword(userId: string, hashedPassword: string): Promise<void>;

  /**
   * ユーザーIDですべてのセッションを削除
   */
  deleteAllSessions(userId: string): Promise<void>;
}
