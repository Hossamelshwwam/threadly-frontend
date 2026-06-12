"use client";

import React from "react";
import { RiInboxLine } from "react-icons/ri";

interface Props {
  hasActiveFilter: boolean;
  onClear?: () => void;
}

export function SellerReviewEmptyState({ hasActiveFilter, onClear }: Props) {
  return (
    <div className="p-12 text-center space-y-4">
      <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto">
        <RiInboxLine className="text-3xl text-zinc-300" />
      </div>
      <div>
        <p className="text-sm font-bold text-zinc-600">
          {hasActiveFilter ? "No matching reviews" : "No reviews yet"}
        </p>
        <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
          {hasActiveFilter
            ? "No reviews match the selected rating. Try a different filter."
            : "Reviews from customers will appear here once they start submitting feedback on your products."}
        </p>
      </div>
      {hasActiveFilter && onClear && (
        <button
          onClick={onClear}
          className="text-xs font-semibold text-main hover:text-main-warm hover:underline transition-colors"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
