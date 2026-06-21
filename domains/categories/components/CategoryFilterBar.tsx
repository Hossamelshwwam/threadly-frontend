"use client";

import React from "react";
import { cn } from "@/shared/lib";

const ACTIVE_FILTERS: { label: string; value: boolean | "" }[] = [
  { label: "All", value: "" },
  { label: "Active Only", value: true },
  { label: "Inactive Only", value: false },
];

interface CategoryFilterBarProps {
  activeFilter: boolean | "";
  onFilterChange: (value: boolean | "") => void;
}

export function CategoryFilterBar({
  activeFilter,
  onFilterChange,
}: CategoryFilterBarProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans shadow-sm">
      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
        Visibility Filter
      </span>

      <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
        {ACTIVE_FILTERS.map((f) => (
          <button
            key={f.label}
            type="button"
            onClick={() => onFilterChange(f.value)}
            className={cn(
              "flex-1 sm:flex-none text-xs font-semibold px-2 py-2.5 sm:px-4 sm:py-1.5 rounded-lg sm:rounded-md transition-colors cursor-pointer text-center whitespace-nowrap",
              activeFilter === f.value
                ? "bg-amber-400 text-white shadow-sm"
                : "bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
