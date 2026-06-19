import { AdminSidebar } from "@/shared/components/admin/AdminSidebar";
import { AdminHeader } from "@/shared/components/admin/AdminHeader";
import { AdminGuard } from "@/shared/guards/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-zinc-50 font-sans">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main content — offset by sidebar width */}
        <div className="ml-60 flex flex-col min-h-screen">
          {/* Sticky header */}
          <AdminHeader />

          {/* Page content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
