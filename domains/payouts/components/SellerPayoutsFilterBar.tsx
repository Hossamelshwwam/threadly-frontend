"use client";

import React from "react";
import { cn } from "@/shared/lib";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import type { PayoutStatus } from "../types/payout.types";

const STATUS_OPTIONS: { label: string; value: PayoutStatus | "" }[] = [
  { label: "All Statuses", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Paid", value: "paid" },
  { label: "Rejected", value: "rejected" },
];

export interface SellerPayoutsFilterState {
  status: PayoutStatus | "";
  from: string;
  to: string;
}

interface SellerPayoutsFilterBarProps {
  filters: SellerPayoutsFilterState;
  onFilterChange: (filters: SellerPayoutsFilterState) => void;
}

export function SellerPayoutsFilterBar({
  filters,
  onFilterChange,
}: SellerPayoutsFilterBarProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg shadow-xs font-sans p-4 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CustomInput
          name="fromDate"
          type="date"
          label="From Date"
          value={filters.from}
          half
          onChange={(e) =>
            onFilterChange({ ...filters, from: e.target.value })
          }
        />
        <CustomInput
          name="toDate"
          type="date"
          label="To Date"
          value={filters.to}
          half
          onChange={(e) =>
            onFilterChange({ ...filters, to: e.target.value })
          }
        />
      </div>

      <div className="border-t border-zinc-100 pt-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider shrink-0">
          Payout Status
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 w-full lg:justify-end custom-scrollbar">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() =>
                onFilterChange({ ...filters, status: opt.value as PayoutStatus | "" })
              }
              className={cn(
                "text-xs font-semibold px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer",
                filters.status === opt.value
                  ? "bg-amber-400 text-white shadow-xs"
                  : "bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
