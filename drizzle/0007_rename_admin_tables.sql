-- Rename auth tables to admin_* prefix
ALTER TABLE "user" RENAME TO "admin_user";
ALTER TABLE "session" RENAME TO "admin_session";
ALTER TABLE "account" RENAME TO "admin_account";

-- Rename indexes
ALTER INDEX "session_userId_idx" RENAME TO "admin_session_userId_idx";
ALTER INDEX "account_userId_idx" RENAME TO "admin_account_userId_idx";

-- Rename unique constraints
ALTER TABLE "admin_user" RENAME CONSTRAINT "user_email_unique" TO "admin_user_email_unique";
ALTER TABLE "admin_session" RENAME CONSTRAINT "session_token_unique" TO "admin_session_token_unique";

-- Rename foreign key constraints
ALTER TABLE "admin_session" RENAME CONSTRAINT "session_user_id_user_id_fk" TO "admin_session_user_id_admin_user_id_fk";
ALTER TABLE "admin_account" RENAME CONSTRAINT "account_user_id_user_id_fk" TO "admin_account_user_id_admin_user_id_fk";

-- Update role values: remove 'user' role, keep only 'admin' and 'super_admin'
UPDATE "admin_user" SET role = 'admin' WHERE role = 'user';

