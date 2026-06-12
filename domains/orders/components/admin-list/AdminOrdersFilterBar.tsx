"use client";

import React, { useState } from "react";
import {
  RiCheckLine,
  RiFilterOffLine,
  RiFilterLine,
  RiArrowUpSLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import { cn } from "@/shared/lib";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomButton from "@/shared/components/custom-button/custom-button";
import type { OrderStatus, PaymentStatus } from "../../types/order.types";

const STATUS_FILTERS: { label: string; value: OrderStatus | "" }[] = [
  { label: "All Statuses", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Partially Shipped", value: "partially_shipped" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const PAYMENT_FILTERS: { label: string; value: PaymentStatus | "" }[] = [
  { label: "All Payments", value: "" },
  { label: "Unpaid", value: "unpaid" },
  { label: "Paid", value: "paid" },
  { label: "Refunded", value: "refunded" },
];

export interface AdminOrderFiltersState {
  status: OrderStatus | "";
  paymentStatus: PaymentStatus | "";
  from: string;
  to: string;
}

interface AdminOrdersFilterBarProps {
  initialFilters: AdminOrderFiltersState;
  onApply: (filters: AdminOrderFiltersState) => void;
  onReset: () => void;
}

export function AdminOrdersFilterBar({
  initialFilters,
  onApply,
  onReset,
}: AdminOrdersFilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] =
    useState<AdminOrderFiltersState>(initialFilters);

  // Evaluates if any active configuration parameters deviate from baseline default properties
  const activeFiltersCount = [
    localFilters.status !== "",
    localFilters.paymentStatus !== "",
    localFilters.from !== "",
    localFilters.to !== "",
  ].filter(Boolean).length;

  const handleApply = () => {
    onApply(localFilters);
  };

  const handleReset = () => {
    setLocalFilters({ status: "", paymentStatus: "", from: "", to: "" });
    onReset();
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-lg shadow-xs font-sans flex flex-col overflow-hidden">
      {/* Clickable Header Toggle Controller Ribbon */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-4 py-3.5 flex items-center justify-between cursor-pointer select-none bg-zinc-50/40 hover:bg-zinc-50 transition-colors"
      >
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
        <div className="text-zinc-400">
          {isExpanded ? (
            <RiArrowUpSLine size={20} />
          ) : (
            <RiArrowDownSLine size={20} />
          )}
        </div>
      </div>

      {/* Expandable Parameters Form Panel Wrapper */}
      {isExpanded && (
        <div className="p-4 border-t border-zinc-100 space-y-4 animate-fadeIn">
          {/* Top Layer: Date Range Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:max-w-xl">
            <CustomInput
              name="fromDate"
              type="date"
              label="From Date"
              value={localFilters.from}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, from: e.target.value })
              }
              half
            />

            <CustomInput
              name="toDate"
              type="date"
              label="To Date"
              value={localFilters.to}
              half
              onChange={(e) =>
                setLocalFilters({ ...localFilters, to: e.target.value })
              }
            />
          </div>

          {/* Middle Layer: Payment Status Badge Controls */}
          <div className="border-t border-zinc-100 pt-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider shrink-0">
              Payment State
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 w-full lg:justify-end custom-scrollbar">
              {PAYMENT_FILTERS.map((f) => (
                <button
                  key={f.label}
                  type="button"
                  onClick={() =>
                    setLocalFilters({ ...localFilters, paymentStatus: f.value })
                  }
                  className={cn(
                    "text-xs font-semibold px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer",
                    localFilters.paymentStatus === f.value
                      ? "bg-amber-400 text-white shadow-xs"
                      : "bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
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
                  onClick={() =>
                    setLocalFilters({ ...localFilters, status: f.value })
                  }
                  className={cn(
                    "text-xs font-semibold px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer",
                    localFilters.status === f.value
                      ? "bg-amber-400 text-white shadow-xs"
                      : "bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Controls Layer: Apply & Reset */}
          <div className="flex justify-end items-center gap-2 border-t border-zinc-100 pt-4 mt-2">
            <CustomButton
              type="button"
              variant="outline"
              theme="neutral"
              size="sm"
              className="h-9 px-4 text-xs font-semibold"
              leftIcon={<RiFilterOffLine />}
              onClick={handleReset}
            >
              Reset Filters
            </CustomButton>
            <CustomButton
              type="button"
              variant="solid"
              theme="primary"
              size="sm"
              className="h-9 px-6 text-xs font-semibold"
              leftIcon={<RiCheckLine />}
              onClick={handleApply}
            >
              Confirm & Apply
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
