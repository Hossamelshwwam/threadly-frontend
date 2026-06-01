import Link from "next/link";
import { RiArrowRightLine, RiBankCardLine } from "react-icons/ri";
import type { PayoutStats } from "@/domains/payouts/types/payout.types";

interface PayoutStatsWidgetProps {
  stats?: PayoutStats;
  loading?: boolean;
}

export function PayoutStatsWidget({
  stats,
  loading = false,
}: PayoutStatsWidgetProps) {
  const rows = [
    {
      label: "Pending",
      count: stats?.pending.count ?? 0,
      amount: stats?.pending.netAmount ?? 0,
      dot: "bg-amber-400",
    },
    {
      label: "Processing",
      count: stats?.processing.count ?? 0,
      amount: stats?.processing.netAmount ?? 0,
      dot: "bg-blue-400",
    },
    {
      label: "Paid",
      count: stats?.paid.count ?? 0,
      amount: stats?.paid.netAmount ?? 0,
      dot: "bg-green-400",
    },
    {
      label: "Rejected",
      count: stats?.rejected.count ?? 0,
      amount: stats?.rejected.netAmount ?? 0,
      dot: "bg-red-400",
    },
  ];

  return (
    <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <RiBankCardLine className="text-amber-500 text-base" />
          <h2 className="text-base font-bold text-zinc-900">Payout Overview</h2>
        </div>
        <Link
          href="/admin/payouts"
          className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
        >
          Manage
          <RiArrowRightLine />
        </Link>
      </div>

      {/* Rows */}
      <div className="divide-y divide-zinc-50">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between px-5 py-3.5"
          >
            <div className="flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full shrink-0 ${row.dot}`} />
              <span className="text-sm font-medium text-zinc-700">
                {row.label}
              </span>
            </div>
            {loading ? (
              <div className="h-4 w-24 rounded bg-zinc-100 animate-pulse" />
            ) : (
              <div className="text-right">
                <p className="text-sm font-bold text-zinc-900">
                  EGP {row.amount.toLocaleString()}
                </p>
                <p className="text-xs text-zinc-400">{row.count} payouts</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
