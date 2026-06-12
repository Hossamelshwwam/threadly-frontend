"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  RiStore2Line,
  RiTimeLine,
  RiShieldCheckLine,
  RiMailSendLine,
  RiLogoutBoxLine,
} from "react-icons/ri";

import { useGetMyStore } from "../hooks/useGetMyStore";
import CustomButton from "@/shared/components/custom-button/custom-button";

export default function SellerPendingApprovalPage() {
  const router = useRouter();
  const { data, isLoading, refetch, isRefetching } = useGetMyStore();

  const store = data?.data;
  const status = store?.status;

  useEffect(() => {
    if (status === "approved") {
      router.push("/seller");
    }
  }, [status, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 p-4 font-sans">
        <div className="max-w-lg w-full space-y-8 animate-in fade-in duration-200">
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 sm:p-10 shadow-sm space-y-8">
            <div className="space-y-3 text-center">
              <div className="h-8 w-48 bg-zinc-100 rounded-lg animate-pulse mx-auto" />
              <div className="h-4 w-64 bg-zinc-100 rounded animate-pulse mx-auto" />
            </div>
            <div className="flex items-center justify-between px-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 animate-pulse" />
                  <div className="h-3 w-16 bg-zinc-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
            <div className="h-24 bg-zinc-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 p-4 font-sans">
      <div className="max-w-lg w-full space-y-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Card */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-8 sm:p-10 shadow-sm text-center space-y-8">
          {/* Icon */}
          <div className="w-16 h-16 bg-amber-50 border border-amber-100 text-amber-500 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <RiTimeLine size={32} />
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
              Store Review in Progress
            </h1>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-sm mx-auto">
              Your vendor registration for{" "}
              <span className="font-bold text-zinc-800">
                &ldquo;{store?.storeName || "your store"}&rdquo;
              </span>{" "}
              is currently being reviewed by our team.
            </p>
          </div>

          {/* Status Tracker */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shrink-0">
                  <RiShieldCheckLine size={16} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-zinc-900">
                    Registration Submitted
                  </p>
                  <p className="text-xs text-zinc-400">Your details are in</p>
                </div>
              </div>
            </div>

            <div className="relative pl-11">
              <div className="absolute left-[15px] top-0 bottom-0 w-px bg-amber-200" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-100 border-2 border-amber-400 rounded-full flex items-center justify-center shrink-0 relative z-10">
                  <RiTimeLine size={14} className="text-amber-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-zinc-900">
                    Under Review
                  </p>
                  <p className="text-xs text-zinc-400">
                    Admin is verifying your store
                  </p>
                </div>
              </div>
            </div>

            <div className="relative pl-11">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-zinc-100 border-2 border-dashed border-zinc-300 rounded-full flex items-center justify-center shrink-0">
                  <RiStore2Line size={14} className="text-zinc-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-zinc-400">Approved</p>
                  <p className="text-xs text-zinc-300">
                    Start selling on Threadly
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200 text-left space-y-3">
            <div className="flex items-start gap-3">
              <RiMailSendLine
                className="text-zinc-400 shrink-0 mt-0.5"
                size={16}
              />
              <div>
                <p className="text-xs font-semibold text-zinc-700">
                  What happens next?
                </p>
                <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
                  You will receive an email notification once your store is
                  approved. You can also check back here anytime.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RiTimeLine className="text-zinc-400 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-xs font-semibold text-zinc-700">
                  Estimated time
                </p>
                <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
                  Most stores are reviewed within 24-48 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <CustomButton
              variant="solid"
              theme="primary"
              onClick={() => refetch()}
              fullWidth
              loading={isRefetching}
            >
              Check Approval Status
            </CustomButton>
            <CustomButton
              variant="outline"
              theme="neutral"
              leftIcon={<RiLogoutBoxLine />}
              onClick={handleSignOut}
              fullWidth
            >
              Sign Out
            </CustomButton>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-zinc-400 text-center">
          Need help?{" "}
          <a
            href="mailto:support@threadly.com"
            className="text-main hover:underline font-bold"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
