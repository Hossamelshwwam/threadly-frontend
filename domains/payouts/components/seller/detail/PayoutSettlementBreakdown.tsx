"use client";

import type { Payout } from "../../../types/payout.types";

interface PayoutSettlementBreakdownProps {
  payout: Payout;
}

export function PayoutSettlementBreakdown({
  payout,
}: PayoutSettlementBreakdownProps) {
  return (
    <div className="p-6 sm:p-8 space-y-4 bg-zinc-50">
      <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">
        Settlement Calculation
      </h4>

      <div className="flex justify-between items-center text-sm">
        <span className="text-zinc-600 font-medium">
          Gross Transaction Volume
        </span>
        <span className="font-semibold text-zinc-900">
          EGP{" "}
          {payout.amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className="text-zinc-600 font-medium">Platform Commission</span>
        <span className="font-semibold text-error bg-error-bg px-2 py-0.5 rounded border border-error/20">
          - EGP{" "}
          {payout.platformFee.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </span>
      </div>

      <div className="pt-4 border-t border-dashed border-zinc-300 flex justify-between items-end">
        <span className="text-sm font-bold text-zinc-900">
          Final Disbursement
        </span>
        <span className="font-black text-xl text-success">
          EGP{" "}
          {payout.netAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </span>
      </div>
    </div>
  );
}
