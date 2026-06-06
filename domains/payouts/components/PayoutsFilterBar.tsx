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
import type { PayoutStatus, AdminPayoutsParams } from "../types/payout.types";

const STATUS_FILTERS: { label: string; value: PayoutStatus | "" }[] = [
  { label: "All Statuses", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Paid", value: "paid" },
  { label: "Rejected", value: "rejected" },
];

export interface PayoutFiltersState {
  status: PayoutStatus | "";
  seller: string;
  from: string;
  to: string;
}

interface PayoutsFilterBarProps {
  initialFilters: PayoutFiltersState;
  onApply: (filters: PayoutFiltersState) => void;
  onReset: () => void;
}

export function PayoutsFilterBar({
  initialFilters,
  onApply,
  onReset,
}: PayoutsFilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] =
    useState<PayoutFiltersState>(initialFilters);

  const activeFiltersCount = [
    localFilters.status !== "",
    localFilters.seller !== "",
    localFilters.from !== "",
    localFilters.to !== "",
  ].filter(Boolean).length;

  const handleApply = () => onApply(localFilters);

  const handleReset = () => {
    setLocalFilters({ status: "", seller: "", from: "", to: "" });
    onReset();
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-lg shadow-xs font-sans flex flex-col overflow-hidden">
      {/* Header Toggle */}
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
            Filter Payout Requests
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

      {/* Form Panel */}
      {isExpanded && (
        <div className="p-4 border-t border-zinc-100 space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CustomInput
              name="seller"
              type="text"
              label="Search Seller ID / Name"
              placeholder="e.g. 64a7b..."
              value={localFilters.seller}
              half
              onChange={(e) =>
                setLocalFilters({ ...localFilters, seller: e.target.value })
              }
            />
            <CustomInput
              name="fromDate"
              type="date"
              label="From Date"
              value={localFilters.from}
              half
              onChange={(e) =>
                setLocalFilters({ ...localFilters, from: e.target.value })
              }
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

          <div className="border-t border-zinc-100 pt-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider shrink-0">
              Payout State
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 w-full lg:justify-end custom-scrollbar">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f.label}
                  type="button"
                  onClick={() =>
                    setLocalFilters({
                      ...localFilters,
                      status: f.value as PayoutStatus | "",
                    })
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
              Reset
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
              Apply Filters
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
