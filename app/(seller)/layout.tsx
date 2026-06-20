"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SellerSidebar } from "@/shared/components/seller/SellerSidebar";
import { SellerHeader } from "@/shared/components/seller/SellerHeader";
import { SellerGuard } from "@/shared/guards/SellerGuard";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isOnboarding = pathname === "/seller/onboarding";
  const isPendingApproval = pathname === "/seller/pending-approval";
  const hideLayout = isOnboarding || isPendingApproval;

  return (
    <SellerGuard>
      <div className="min-h-screen flex bg-zinc-50">
        {!hideLayout && <SellerSidebar />}

        <div className="flex-1 flex flex-col min-w-0">
          {!hideLayout && <SellerHeader />}

          <main
            className={`flex-1 overflow-y-auto ${
              hideLayout ? "p-4" : "p-4 sm:p-6 lg:p-8"
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </SellerGuard>
  );
}
