import type { AdminUserRole } from "./userRole";

export { AdminUserRole, isAdminUserRole } from "./userRole";

export interface AdminUserEntity {
  id: string;
  name: string;
  email: string;
  role: AdminUserRole;
  createdAt: string; // 時刻がある時はISO8601形式、ない時はYYYY-MM-DD形式
  updatedAt: string; // 時刻がある時はISO8601形式、ない時はYYYY-MM-DD形式
}
