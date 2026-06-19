"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useGetMyStore } from "@/domains/sellers/hooks/useGetMyStore";
import { useGetMe } from "@/domains/users/hooks/useUser"; // Import user hook
import { FaSpinner } from "react-icons/fa";
import { RiCloseCircleLine, RiLogoutBoxLine } from "react-icons/ri";
import CustomButton from "@/shared/components/custom-button/custom-button";
import useLogout from "../hooks/useLogout";

export function SellerGuard({ children }: { children: React.ReactNode }) {
  // Fetch both store data and user data
  const { data: storeData, isLoading: isStoreLoading } = useGetMyStore();
  const { data: userData, isPending: isUserLoading } = useGetMe();

  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useLogout();
  // Unified loading state
  const isLoading = isStoreLoading || isUserLoading;

  // Derived state
  const isSeller = !!storeData?.data;
  const storeStatus = storeData?.data?.status;
  const isBuyer = userData?.data?.role === "buyer"; // Check if the user is a buyer

  const isOnboarding = pathname === "/seller/onboarding";
  const isPendingApproval = pathname === "/seller/pending-approval";

  // Determine if a redirect is about to happen
  const needsRedirect =
    (!isSeller && !isOnboarding && !isPendingApproval) ||
    (isSeller && isOnboarding) ||
    (isSeller && storeStatus === "pending" && !isPendingApproval);

  useEffect(() => {
    if (!isLoading) {
      if (!isSeller && !isOnboarding && !isPendingApproval) {
        // Validation: ONLY redirect to onboarding if the user is a buyer
        if (isBuyer) {
          router.push("/seller/onboarding");
        } else {
          // If they are an Admin (or another role) without a store, send them to the homepage
          router.push("/");
        }
      } else if (isSeller && isOnboarding) {
        // Seller already exists, no need to be on onboarding page
        router.push("/seller");
      } else if (isSeller && storeStatus === "pending" && !isPendingApproval) {
        // Seller exists but is pending approval
        router.push("/seller/pending-approval");
      }
    }
  }, [
    isLoading,
    isSeller,
    isOnboarding,
    isPendingApproval,
    storeStatus,
    isBuyer,
    router,
  ]);

  const handleSignOut = () => {
    logout();
  };

  // 1. Loading State
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

  // 2. Prevent rendering protected content while the redirect is happening
  if (needsRedirect) {
    return null;
  }

  // 3. Specific status handling (Suspended)
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
                &ldquo;{storeData?.data?.storeName}&rdquo;
              </span>{" "}
              has been restricted due to a policy compliance or platform
              regulation violation.
            </p>
          </div>

          {storeData?.data?.adminNote && (
            <div className="bg-error-bg/30 text-left p-4 rounded-xl border border-error/10">
              <span className="text-[10px] font-bold text-error uppercase tracking-wider block mb-1">
                Reason for restriction
              </span>
              <p className="text-xs text-zinc-700 font-medium leading-relaxed italic">
                &quot;{storeData.data.adminNote}&quot;
              </p>
            </div>
          )}

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

  // 4. Render the secure page if fully authorized
  return <>{children}</>;
}
