"use client";

import { RiArrowUpDownLine } from "react-icons/ri";

const SORT_OPTIONS = [
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
] as const;

interface SortFilterProps {
  value?: string;
  onChange: (value: string | undefined) => void;
}

export function SortFilter({ value, onChange }: SortFilterProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-2.5">
        <RiArrowUpDownLine size={14} />
        Sort By
      </label>
      <div className="space-y-0.5">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() =>
              onChange(value === opt.value ? undefined : opt.value)
            }
            aria-pressed={value === opt.value}
            className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
              value === opt.value
                ? "bg-main text-main-subtle font-medium"
                : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
