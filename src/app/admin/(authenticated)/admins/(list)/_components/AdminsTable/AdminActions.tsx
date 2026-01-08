"use client";

import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";

interface AdminActionsProps {
  adminId: string;
}

/**
 * 管理者操作ボタン群
 *
 * Refineのボタンコンポーネントを使用
 */
export function AdminActions({ adminId }: AdminActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <ShowButton
        recordItemId={adminId}
        className="bg-primary text-primary-foreground"
      />
      <EditButton
        recordItemId={adminId}
        className="bg-secondary text-secondary-foreground"
      />
      <DeleteButton
        recordItemId={adminId}
        className="bg-destructive text-destructive-foreground"
      />
    </div>
  );
}
