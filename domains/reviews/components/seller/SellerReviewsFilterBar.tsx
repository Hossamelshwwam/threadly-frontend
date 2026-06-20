"use client";

import React from "react";
import { cn } from "@/shared/lib";
import type { SortOption } from "../../types/review.types";

interface SellerReviewsFilterBarProps {
  activeRating: number | null;
  activeSort: SortOption;
  onRatingChange: (rating: number | null) => void;
  onSortChange: (sort: SortOption) => void;
}

const RATING_OPTIONS = [
  { label: "All Ratings", value: null },
  { label: "5★", value: 5 },
  { label: "4★", value: 4 },
  { label: "3★", value: 3 },
  { label: "2★", value: 2 },
  { label: "1★", value: 1 },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Highest Rating", value: "rating_desc" },
  { label: "Lowest Rating", value: "rating_asc" },
];

export function SellerReviewsFilterBar({
  activeRating,
  activeSort,
  onRatingChange,
  onSortChange,
}: SellerReviewsFilterBarProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl shadow-xs font-sans p-4 sm:p-5">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 xl:gap-4">
        {/* Rating Filters */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
            Rating
          </span>
          {/* FIX: Added `flex-wrap` and adjusted gap so pills stack cleanly on mobile */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {RATING_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => onRatingChange(opt.value)}
                className={cn(
                  "text-xs font-semibold px-4 py-2 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-md transition-colors whitespace-nowrap cursor-pointer",
                  activeRating === opt.value
                    ? "bg-amber-400 text-white shadow-sm"
                    : "bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Filters */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
            Sort By
          </span>
          {/* FIX: Added `flex-wrap` so options wrap gracefully on small phones */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => onSortChange(opt.value)}
                className={cn(
                  "text-xs font-semibold px-4 py-2 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-md transition-colors whitespace-nowrap cursor-pointer",
                  activeSort === opt.value
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
