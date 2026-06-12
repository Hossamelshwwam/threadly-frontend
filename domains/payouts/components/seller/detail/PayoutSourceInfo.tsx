"use client";

import { RiShoppingBag3Line, RiCalendarLine } from "react-icons/ri";
import type { Payout } from "../../../types/payout.types";

interface PayoutSourceInfoProps {
  payout: Payout;
}

export function PayoutSourceInfo({ payout }: PayoutSourceInfoProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 p-6 sm:p-8 gap-8 border-b border-zinc-200 bg-zinc-50">
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-zinc-800">
          <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
            <RiShoppingBag3Line size={18} className="text-amber-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
              Source Order
            </p>
            {payout.orderId ? (
              <p className="text-sm font-bold font-mono text-zinc-900">
                {payout.orderId.orderNumber}
              </p>
            ) : (
              <span className="text-sm font-medium italic text-zinc-400">
                N/A
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-zinc-800">
          <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
            <RiCalendarLine size={18} className="text-blue-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
              Order Date
            </p>
            {payout.orderId?.createdAt ? (
              <p className="text-sm font-semibold text-zinc-900">
                {new Date(payout.orderId.createdAt).toLocaleDateString("en-EG", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            ) : (
              <span className="text-sm font-medium italic text-zinc-400">
                N/A
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
