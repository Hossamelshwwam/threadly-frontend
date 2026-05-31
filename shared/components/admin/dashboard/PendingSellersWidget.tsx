import Link from "next/link";
import { RiArrowRightLine, RiStoreLine } from "react-icons/ri";
import type { SellerProfile } from "@/domains/sellers/types/seller.types";

interface PendingSellersWidgetProps {
  sellers: SellerProfile[];
  loading?: boolean;
}

export function PendingSellersWidget({
  sellers,
  loading = false,
}: PendingSellersWidgetProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-700 text-zinc-900">
            Pending Seller Approvals
          </h2>
          {sellers.length > 0 && (
            <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-amber-400 text-white text-[10px] font-700 flex items-center justify-center">
              {sellers.length}
            </span>
          )}
        </div>
        <Link
          href="/admin/sellers?status=pending"
          className="flex items-center gap-1.5 text-xs font-600 text-amber-600 hover:text-amber-700 transition-colors"
        >
          View all
          <RiArrowRightLine />
        </Link>
      </div>

      {/* List */}
      <div className="divide-y divide-zinc-50">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-4">
                <div className="w-9 h-9 rounded-md bg-zinc-100 animate-pulse shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 w-32 rounded bg-zinc-100 animate-pulse" />
                  <div className="h-3 w-24 rounded bg-zinc-100 animate-pulse" />
                </div>
                <div className="h-7 w-16 rounded-md bg-zinc-100 animate-pulse" />
              </div>
            ))
          : sellers.slice(0, 5).map((seller) => (
              <div
                key={seller._id}
                className="flex items-center gap-3 px-5 py-4 hover:bg-zinc-50/60 transition-colors"
              >
                {/* Logo / placeholder */}
                <div className="w-9 h-9 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 overflow-hidden">
                  {seller.logo ? (
                    <img
                      src={seller.logo}
                      alt={seller.storeName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <RiStoreLine className="text-amber-400 text-base" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-600 text-zinc-800 truncate">
                    {seller.storeName}
                  </p>
                  <p className="text-xs text-zinc-400 truncate">
                    {seller.userId?.email}
                  </p>
                </div>

                {/* Action */}
                <Link
                  href={`/admin/sellers/${seller._id}`}
                  className="shrink-0 text-xs font-600 text-amber-600 hover:text-amber-700 border border-amber-200 hover:border-amber-300 hover:bg-amber-50 px-3 py-1.5 rounded-md transition-all"
                >
                  Review
                </Link>
              </div>
            ))}

        {!loading && sellers.length === 0 && (
          <div className="py-10 text-center text-zinc-400 text-sm">
            No pending approvals
          </div>
        )}
      </div>
    </div>
  );
}
