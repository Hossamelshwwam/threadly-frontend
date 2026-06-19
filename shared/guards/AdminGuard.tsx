"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useGetMe } from "@/domains/users/hooks/useUser";
import { FaSpinner } from "react-icons/fa";
import { RiCloseCircleLine, RiHome5Line } from "react-icons/ri";
import CustomButton from "@/shared/components/custom-button/custom-button";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { data, isPending } = useGetMe();
  const router = useRouter();
  const pathname = usePathname();

  const user = data?.data;
  const isAdmin = user?.role === "admin"; // Adjust this based on your exact API role string

  useEffect(() => {
    // If not loading and no user exists at all, redirect to login
    if (!isPending && !user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, user, router, pathname]);

  // 1. Loading State
  if (isPending) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-50 font-sans">
        <FaSpinner className="text-4xl text-[#d99a4a] animate-spin mb-4" />
        <p className="text-sm font-medium text-zinc-500 animate-pulse">
          Verifying administrator privileges...
        </p>
      </div>
    );
  }

  // 2. Prevent rendering while redirecting an unauthenticated user
  if (!user) {
    return null;
  }

  // 3. User is logged in, but is NOT an admin
  if (!isAdmin) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-50 p-4 font-sans">
        <div className="max-w-md w-full bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mx-auto shadow-sm border border-red-100">
            <RiCloseCircleLine size={28} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-zinc-900 tracking-tight">
              Admin Access Restricted
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed">
              You are currently logged in as{" "}
              <span className="font-bold text-zinc-800">{user.email}</span>,
              which does not have administrator privileges.
            </p>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed pb-2">
            If you believe you should have access to this dashboard, please
            contact the system owner.
          </p>

          <CustomButton
            variant="solid"
            theme="neutral"
            leftIcon={<RiHome5Line />}
            onClick={() => router.push("/")}
            fullWidth
            className="h-12"
          >
            Return to Homepage
          </CustomButton>
        </div>
      </div>
    );
  }

  // 4. User is verified as an Admin
  return <>{children}</>;
}
