import type { ReactNode } from "react";
import { Navbar } from "@/shared/components/buyer/Navbar";
import { Footer } from "@/shared/components/buyer/Footer";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
export default function StorefrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
      <SidebarProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
      </SidebarProvider>
      <Footer />
    </div>
  );
}
