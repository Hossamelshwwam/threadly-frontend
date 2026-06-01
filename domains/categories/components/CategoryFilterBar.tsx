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
    <div className="bg-white border border-zinc-200 rounded-lg px-4 py-3 flex items-center justify-between gap-3 font-sans">
      <span className="text-xs font-600 text-zinc-400 uppercase tracking-wider">
        Visibility Filter
      </span>
      <div className="flex items-center gap-1.5">
        {ACTIVE_FILTERS.map((f) => (
          <button
            key={f.label}
            type="button"
            onClick={() => onFilterChange(f.value)}
            className={cn(
              "text-xs font-600 px-3 py-1.5 rounded-md transition-colors cursor-pointer",
              activeFilter === f.value
                ? "bg-amber-400 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
