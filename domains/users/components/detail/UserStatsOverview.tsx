"use client";

import { RiShoppingBag3Line, RiBankCardLine } from "react-icons/ri";

interface UserStatsOverviewProps {
  orderCount: number;
  totalSpent: number;
}

export function UserStatsOverview({
  orderCount,
  totalSpent,
}: UserStatsOverviewProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white border border-zinc-200 rounded-lg p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-600 text-zinc-400 uppercase tracking-wider">
            Total Orders
          </p>
          <span className="w-9 h-9 rounded-md bg-zinc-50 border border-zinc-200 flex items-center justify-center">
            <RiShoppingBag3Line className="text-amber-500 text-base" />
          </span>
        </div>
        <p className="text-3xl font-700 text-zinc-900">{orderCount}</p>
      </div>

      <div className="bg-amber-400 border border-amber-400 rounded-lg p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-600 text-amber-100 uppercase tracking-wider">
            Total Spent
          </p>
          <span className="w-9 h-9 rounded-md bg-amber-500/40 flex items-center justify-center">
            <RiBankCardLine className="text-white text-base" />
          </span>
        </div>
        <p className="text-3xl font-700 text-white">
          EGP {totalSpent.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
