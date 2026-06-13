import type { ReactNode } from "react";
import { Navbar } from "@/shared/components/buyer/Navbar";
import { Footer } from "@/shared/components/buyer/Footer";

export default function StorefrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
