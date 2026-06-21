"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { RiArrowLeftLine, RiLoader4Line } from "react-icons/ri";

import { useAdminPayout } from "../hooks/useAdminPayouts";
import { PayoutDetailsCard } from "../components/detail/PayoutDetailsCard";
import { PayoutActionPanel } from "../components/detail/PayoutActionPanel";
import CustomButton from "@/shared/components/custom-button/custom-button";
import Link from "next/link";

export default function AdminPayoutDetailPage() {
  const params = useParams();
  const router = useRouter();
  const payoutId = params.id as string;

  const { data: response, isLoading, isError } = useAdminPayout(payoutId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <RiLoader4Line className="animate-spin text-amber-500 text-3xl" />
        <p className="text-sm font-medium text-zinc-500">
          Retrieving secure financial ledger...
        </p>
      </div>
    );
  }

  if (isError || !response?.data) {
    return (
      <div className="text-center py-12 space-y-3">
        <p className="text-error font-semibold">
          Failed to load payout details.
        </p>
        <CustomButton variant="outline" onClick={() => router.back()}>
          Go Back
        </CustomButton>
      </div>
    );
  }

  const payout = response.data;

  return (
    <div className="space-y-6 font-sans max-w-6xl mx-auto pb-12">
      <Link
        href="/admin/payouts"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
      >
        <RiArrowLeftLine /> Back to Payouts
      </Link>
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 truncate">
            Payout Detail
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage and review vendor financial settlement.
          </p>
        </div>
      </div>
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <PayoutDetailsCard payout={payout} />
        <PayoutActionPanel payout={payout} />
      </div>
    </div>
  );
}
