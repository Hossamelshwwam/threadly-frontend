"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SellerSidebar } from "@/shared/components/seller/SellerSidebar";
import { SellerHeader } from "@/shared/components/seller/SellerHeader";
import { SellerGuard } from "@/shared/components/seller/SellerGuard";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isOnboarding = pathname === "/seller/onboarding";

  return (
    <SellerGuard>
      <div className="min-h-screen flex bg-zinc-50">
        {/* Hide Sidebar during the onboarding process */}
        {!isOnboarding && <SellerSidebar />}

        <div className="flex-1 flex flex-col min-w-0">
          {/* Hide Header during the onboarding process */}
          {!isOnboarding && <SellerHeader />}

          {/* If onboarding, center it nicely. If dashboard, standard padding */}
          <main
            className={`flex-1 overflow-y-auto ${isOnboarding ? "p-4" : "p-6 sm:p-8"}`}
          >
            {children}
          </main>
        </div>
      </div>
    </SellerGuard>
  );
}
