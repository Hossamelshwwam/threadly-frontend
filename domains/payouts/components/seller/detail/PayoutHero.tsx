"use client";

import { RiExchangeDollarLine } from "react-icons/ri";
import type { Payout } from "../../../types/payout.types";
import { PayoutStatusBadge } from "../../PayoutStatusBadge";

interface PayoutHeroProps {
  payout: Payout;
}

export function PayoutHero({ payout }: PayoutHeroProps) {
  const date = new Date(payout.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 bg-zinc-100 relative overflow-hidden">
      <RiExchangeDollarLine className="absolute -bottom-6 -right-4 text-zinc-300 opacity-20 text-9xl pointer-events-none" />
      <div className="relative z-10">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
          Net Payout
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-zinc-400">EGP</span>
          <h2 className="text-4xl font-black text-zinc-950 tracking-tight">
            {payout.netAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </h2>
        </div>
        <p className="text-xs text-zinc-500 mt-2 font-medium">
          Created on {date}
        </p>
      </div>
      <div className="relative z-10 shrink-0">
        <PayoutStatusBadge status={payout.status} />
      </div>
    </div>
  );
}
