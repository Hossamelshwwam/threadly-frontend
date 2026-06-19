"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useGetMe } from "@/domains/users/hooks/useUser";
import { FaSpinner } from "react-icons/fa";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: user, isPending } = useGetMe();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If the query has finished loading and there is no user, redirect to login.
    if (!isPending && !user) {
      // We pass the current pathname as a redirect URL so they can come right back after logging in
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, user, router, pathname]);

  // 1. Show your THREADLY loading state while checking credentials
  if (isPending) {
    return (
      <div className="h-[70vh] w-full flex flex-col items-center justify-center bg-zinc-50 font-sans">
        <FaSpinner className="text-4xl text-[#d99a4a] animate-spin mb-4" />
        <p className="text-sm font-medium text-zinc-500 animate-pulse">
          Verifying credentials...
        </p>
      </div>
    );
  }

  // 2. Prevent rendering protected content while the redirect is happening
  if (!user) {
    return null;
  }

  // 3. Render the secure page if authenticated
  return <>{children}</>;
}
