import { Authenticated } from "@refinedev/core";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import AdminLoading from "../loading";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedAdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <Authenticated key="authenticated-admin-layout" loading={<AdminLoading />}>
      <div className="admin-theme min-h-screen">
        <AdminSidebar />
        <main className="p-16">{children}</main>
      </div>
    </Authenticated>
  );
}
