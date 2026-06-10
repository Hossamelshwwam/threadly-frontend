"use client";

import React from "react";
import { RiFilterLine } from "react-icons/ri";
import { cn } from "@/shared/lib";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import type { OrderItemStatus } from "../../types/order.types";

const STATUS_FILTERS: { label: string; value: OrderItemStatus | "" }[] = [
  { label: "All Items", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

export interface SellerOrderFiltersState {
  status: OrderItemStatus | "";
  from: string;
  to: string;
}

interface Props {
  filters: SellerOrderFiltersState;
  onFiltersChange: (updated: SellerOrderFiltersState) => void;
}

export function SellerOrdersFilterBar({ filters, onFiltersChange }: Props) {
  // Compute parameter state variances to flag active elements
  const activeFiltersCount = [
    filters.status !== "",
    filters.from !== "",
    filters.to !== "",
  ].filter(Boolean).length;

  const handleUpdateField = (
    key: keyof SellerOrderFiltersState,
    value: string,
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-lg shadow-xs font-sans flex flex-col overflow-hidden">
      {/* Static Header Ribbon */}
      <div className="px-4 py-3.5 flex items-center justify-between bg-zinc-50/40 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <RiFilterLine
            className={cn(
              "text-zinc-400 transition-colors",
              activeFiltersCount > 0 && "text-amber-500",
            )}
            size={16}
          />
          <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
            Filter Ledger Operations
          </span>
          {activeFiltersCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 rounded-md">
              {activeFiltersCount} Active
            </span>
          )}
        </div>
      </div>

      {/* Reactive Parameters Form Panel Layout */}
      <div className="p-4 space-y-4">
        {/* Top Layer: Instant Date Range Adjustments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:max-w-xl">
          <CustomInput
            name="fromDate"
            type="date"
            label="From Date"
            value={filters.from}
            onChange={(e) => handleUpdateField("from", e.target.value)}
            half
          />

          <CustomInput
            name="toDate"
            type="date"
            label="To Date"
            value={filters.to}
            half
            onChange={(e) => handleUpdateField("to", e.target.value)}
          />
        </div>

        {/* Bottom Layer: Order Status Badge Controls */}
        <div className="border-t border-zinc-100 pt-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider shrink-0">
            Order State
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 w-full lg:justify-end custom-scrollbar">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.label}
                type="button"
                onClick={() => handleUpdateField("status", f.value)}
                className={cn(
                  "text-xs font-semibold px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer",
                  filters.status === f.value
                    ? "bg-amber-400 text-white shadow-xs"
                    : "bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
