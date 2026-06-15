import React from "react";
import { AccountSidebar } from "@/domains/users/components/account/AccountSidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-zinc-50 min-h-screen flex justify-center items-center pt-28 pb-20 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 items-start">
          <div className="lg:col-span-2">
            <AccountSidebar />
          </div>

          <div className="lg:col-span-4 flex">{children}</div>
        </div>
      </div>
    </div>
  );
}
