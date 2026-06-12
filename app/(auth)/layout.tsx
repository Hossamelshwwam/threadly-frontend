import AuthFooter from "@/domains/auth/components/layout/auth-footer";
import { AuthHeader } from "@/domains/auth/components/layout/auth-header";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans min-h-screen flex flex-col">
      <AuthHeader />
      {children}

      <AuthFooter />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-amber-400 opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-amber-300 opacity-10 blur-[100px] rounded-full pointer-events-none"></div>
    </div>
  );
}
