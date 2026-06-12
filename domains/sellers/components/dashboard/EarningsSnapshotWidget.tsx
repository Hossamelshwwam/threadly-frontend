"use client";

import Link from "next/link";
import { RiArrowRightLine, RiFundsLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import type { SellerPayoutSummary } from "@/domains/payouts/types/payout.types";

interface EarningsSnapshotWidgetProps {
  summary?: SellerPayoutSummary;
  loading?: boolean;
}

function EarningsSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-5 space-y-4">
      <div className="h-6 w-36 bg-zinc-100 rounded animate-pulse" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-4 w-20 bg-zinc-100 rounded animate-pulse" />
            <div className="h-4 w-16 bg-zinc-100 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EarningsRow({
  label,
  value,
  icon: Icon,
  negative,
  bold,
  variant,
}: {
  label: string;
  value: number;
  icon?: React.ComponentType<{ className?: string }>;
  negative?: boolean;
  bold?: boolean;
  variant?: "default" | "success" | "warning";
}) {
  const colorMap = {
    default: "text-zinc-900",
    success: "text-success" as const,
    warning: "text-warning" as const,
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="text-sm text-zinc-400" />}
        <span className="text-sm text-zinc-500">{label}</span>
      </div>
      <span
        className={`text-sm ${
          bold ? "font-bold" : "font-semibold"
        } ${negative ? "text-red-500" : colorMap[variant ?? "default"]}`}
      >
        EGP {value.toLocaleString()}
      </span>
    </div>
  );
}

export function EarningsSnapshotWidget({
  summary,
  loading = false,
}: EarningsSnapshotWidgetProps) {
  if (loading) return <EarningsSkeleton />;

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-zinc-900">Earnings</h2>
        <RiFundsLine className="text-lg text-zinc-400" />
      </div>

      {summary ? (
        <div className="space-y-3">
          <EarningsRow
            label="Gross Revenue"
            value={summary.totalEarned}
            icon={RiMoneyDollarCircleLine}
          />
          <EarningsRow label="Platform Fees" value={summary.totalFees} negative />
          <div className="border-t border-zinc-100 pt-3">
            <EarningsRow label="Net Earnings" value={summary.totalNet} bold />
          </div>
          <EarningsRow label="Paid Out" value={summary.totalPaid} variant="success" />
          <EarningsRow label="Pending" value={summary.totalPending} variant="warning" />
        </div>
      ) : (
        <p className="text-sm text-zinc-400 text-center py-6">
          No earnings data yet
        </p>
      )}

      <Link
        href="/seller/payouts"
        className="mt-4 flex items-center justify-center gap-1.5 w-full text-xs font-semibold text-amber-600 hover:text-amber-700 border border-amber-200 rounded-lg py-2.5 transition-colors"
      >
        View Payouts
        <RiArrowRightLine className="text-sm" />
      </Link>
    </div>
  );
}
