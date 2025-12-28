"use client";

import { useList } from "@refinedev/core";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { AdminsTableLoading } from "../AdminsTableLoading";
import { NoAdminsRow } from "./NoAdminsRow";
import { AdminTableRow } from "./Row";

type Admin = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
};

// TODO: Entityをdomain層へ移行する;
export function AdminsTable() {
  const { result, query } = useList<Admin>({
    resource: "admins",
  });

  const admins = result.data ?? [];

  if (query.isLoading) {
    return <AdminsTableLoading />;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名前</TableHead>
              <TableHead>メールアドレス</TableHead>
              <TableHead>ロール</TableHead>
              <TableHead>作成日</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.length === 0 ? (
              <NoAdminsRow />
            ) : (
              admins.map((admin) => (
                <AdminTableRow key={admin.id} admin={admin} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-muted-foreground">
        合計 {admins.length} 件
      </div>
    </>
  );
}
