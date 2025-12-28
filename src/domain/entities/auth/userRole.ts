export const AdminUserRole = {
  Admin: "admin",
  SuperAdmin: "super_admin",
} as const satisfies Record<string, string>;

export type AdminUserRole = (typeof AdminUserRole)[keyof typeof AdminUserRole];

export function isAdminUserRole(value: unknown): value is AdminUserRole {
  return Object.values(AdminUserRole).includes(value as AdminUserRole);
}
