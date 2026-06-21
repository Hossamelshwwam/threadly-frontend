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
        {/* Sidebar (Hidden on mobile via its own internal classes) */}
        <AdminSidebar />

        {/* Main content — FIX: margin-left only applies on large screens (lg:ml-60) */}
        <div className="lg:ml-60 flex flex-col min-h-screen min-w-0">

          {/* Sticky header */}
          <AdminHeader />

          {/* Page content — FIX: Responsive padding */}
          <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}