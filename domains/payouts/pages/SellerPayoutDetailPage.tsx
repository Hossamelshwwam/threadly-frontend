"use client";

import { useParams, useRouter } from "next/navigation";
import { RiArrowLeftLine, RiLoader4Line } from "react-icons/ri";

import { useSellerPayout } from "../hooks/useSellerPayouts";
import { PayoutHero } from "../components/seller/detail/PayoutHero";
import { PayoutSourceInfo } from "../components/seller/detail/PayoutSourceInfo";
import { PayoutSettlementBreakdown } from "../components/seller/detail/PayoutSettlementBreakdown";
import { PayoutAdminNote } from "../components/seller/detail/PayoutAdminNote";
import CustomButton from "@/shared/components/custom-button/custom-button";

export default function SellerPayoutDetailPage() {
  const params = useParams();
  const router = useRouter();
  const payoutId = params.id as string;

  const { data: response, isLoading, isError } = useSellerPayout(payoutId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <RiLoader4Line className="animate-spin text-amber-500 text-3xl" />
        <p className="text-sm font-medium text-zinc-500">
          Loading payout details...
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
      {/* Header with back button */}
      <div className="flex items-center gap-4 border-b border-zinc-200 pb-4">
        <button
          onClick={() => router.push("/seller/payouts")}
          className="p-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-500"
        >
          <RiArrowLeftLine size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Payout Detail</h1>
          <p className="text-xs text-zinc-500 mt-0.5">Payout ID: {payout._id}</p>
        </div>
      </div>

      {/* Main card */}
      <div className="bg-zinc-50 rounded-2xl border border-zinc-200 shadow-sm flex flex-col overflow-hidden">
        <PayoutHero payout={payout} />
        <PayoutSourceInfo payout={payout} />
        <PayoutSettlementBreakdown payout={payout} />
      </div>

      {/* Admin note (if any) */}
      <PayoutAdminNote note={payout.adminNote} />
    </div>
  );
}
