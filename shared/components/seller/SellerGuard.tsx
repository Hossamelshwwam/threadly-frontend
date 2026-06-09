"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useGetMyStore } from "@/domains/sellers/hooks/useGetMyStore";
import { FaSpinner } from "react-icons/fa";
import { RiTimeLine, RiCloseCircleLine, RiLogoutBoxLine } from "react-icons/ri";
import CustomButton from "@/shared/components/custom-button/custom-button";

export function SellerGuard({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useGetMyStore();
  const router = useRouter();
  const pathname = usePathname();

  // If data exists, they have successfully registered a store
  const isSeller = !!data?.data;
  const storeStatus = data?.data?.status;
  const isOnboarding = pathname === "/seller/onboarding";

  useEffect(() => {
    if (!isLoading) {
      if (!isSeller && !isOnboarding) {
        // Not a seller and trying to access dashboard -> Send to onboarding
        router.push("/seller/onboarding");
      } else if (isSeller && isOnboarding) {
        // Already a seller but trying to access onboarding -> Send to dashboard
        router.push("/seller");
      }
    }
  }, [isLoading, isSeller, isOnboarding, router]);

  // Handle fallback sign-out if locked out of operations
  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  // 1. Loading State Workspace
  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-50 font-sans">
        <FaSpinner className="text-4xl text-amber-500 animate-spin mb-4" />
        <p className="text-sm font-medium text-zinc-500 animate-pulse">
          Loading workspace...
        </p>
      </div>
    );
  }

  // 2. Pending Verification State UI
  if (isSeller && storeStatus === "pending") {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-50 p-4 font-sans">
        <div className="max-w-md w-full bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 bg-amber-50 border border-amber-100 text-amber-500 rounded-xl flex items-center justify-center mx-auto shadow-xs">
            <RiTimeLine size={28} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-zinc-900 tracking-tight">
              Store Review Pending
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Your registration parameters for{" "}
              <span className="font-bold text-zinc-800">
                “{data?.data?.storeName}”
              </span>{" "}
              are currently undergoing management validation. We verify all
              vendor accounts to maintain platform marketplace integrity.
            </p>
          </div>
          <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-200 text-left">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-0.5">
              Estimated Duration
            </span>
            <span className="text-xs font-semibold text-zinc-700">
              Usually verified within 24-48 hours.
            </span>
          </div>
          <div className="pt-2">
            <CustomButton
              variant="outline"
              theme="neutral"
              leftIcon={<RiLogoutBoxLine />}
              onClick={handleSignOut}
              fullWidth
            >
              Sign out from account
            </CustomButton>
          </div>
        </div>
      </div>
    );
  }

  // 3. Suspended Account State UI
  if (isSeller && storeStatus === "suspended") {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-50 p-4 font-sans">
        <div className="max-w-md w-full bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 bg-error-bg text-error rounded-xl flex items-center justify-center mx-auto shadow-xs border border-error/10">
            <RiCloseCircleLine size={28} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-zinc-900 tracking-tight">
              Workspace Access Restricted
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Your vendor workspace for{" "}
              <span className="font-bold text-zinc-800">
                “{data?.data?.storeName}”
              </span>{" "}
              has been restricted due to a policy compliance or platform
              regulation violation.
            </p>
          </div>

          {/* Render admin note dynamically if passed from the database */}
          {data?.data?.adminNote && (
            <div className="bg-error-bg/30 text-left p-4 rounded-xl border border-error/10">
              <span className="text-[10px] font-bold text-error uppercase tracking-wider block mb-1">
                Reason for restriction
              </span>
              <p className="text-xs text-zinc-700 font-medium leading-relaxed italic">
                &quot;{data.data.adminNote}&quot;
              </p>
            </div>
          )}

          <p className="text-xs text-zinc-400 leading-relaxed">
            If you feel this restriction was implemented in error, please
            coordinate directly with our official validation department at{" "}
            <a
              href="mailto:compliance@threadly.com"
              className="text-main hover:underline font-bold"
            >
              compliance@threadly.com
            </a>
            .
          </p>
          <div className="pt-2">
            <CustomButton
              variant="solid"
              theme="neutral"
              leftIcon={<RiLogoutBoxLine />}
              onClick={handleSignOut}
              fullWidth
            >
              Exit Dashboard
            </CustomButton>
          </div>
        </div>
      </div>
    );
  }

  // Prevent a brief flash of unauthorized content before the router pushes them away
  if (!isSeller && !isOnboarding) return null;
  if (isSeller && isOnboarding) return null;

  // If all checks pass, render the layout!
  return <>{children}</>;
}
