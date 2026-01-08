import { AdminUserRole } from "@/domain/entities";

export const adminRoleLabel = {
  [AdminUserRole.Admin]: "管理者",
  [AdminUserRole.SuperAdmin]: "スーパー管理者",
} as const;
