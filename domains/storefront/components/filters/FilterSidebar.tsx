"use client";

import { RiCloseLine, RiSearchLine } from "react-icons/ri";
import { SortFilter } from "./SortFilter";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";

export interface FiltersState {
  category?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
}

interface FilterSidebarProps {
  filters: FiltersState;
  onFilterChange: (key: string, value: string | undefined) => void;
  onApply: () => void;
  onReset: () => void;
  appliedFilterCount: number;
  onClose?: () => void;
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onApply,
  onReset,
  appliedFilterCount,
  onClose,
}: FilterSidebarProps) {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-24">
        <div className="lg:bg-white rounded-xl lg:shadow-sm lg:border lg:border-zinc-100 p-5 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <h2 className="text-sm font-semibold tracking-wider uppercase text-zinc-900">
                Filters
              </h2>
              {appliedFilterCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-[10px] font-bold text-white">
                  {appliedFilterCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {onClose && (
                <button
                  onClick={onClose}
                  className="lg:hidden p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 transition-all"
                >
                  <RiCloseLine size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Search */}
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-2.5">
              Search
            </label>
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm" />
              <input
                type="text"
                value={filters.search ?? ""}
                onChange={(e) =>
                  onFilterChange("search", e.target.value || undefined)
                }
                placeholder="Search products..."
                className="w-full bg-white border border-zinc-200 text-sm rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition-all placeholder:text-zinc-400"
              />
            </div>
          </div>

          <hr className="border-zinc-100" />

          {/* Sort */}
          <SortFilter
            value={filters.sort}
            onChange={(v) => onFilterChange("sort", v)}
          />

          <hr className="border-zinc-100" />

          {/* Category */}
          <CategoryFilter
            selected={filters.category}
            onSelect={(v) => onFilterChange("category", v)}
          />

          <hr className="border-zinc-100" />

          {/* Price */}
          <PriceFilter
            min={filters.minPrice}
            max={filters.maxPrice}
            onChange={onFilterChange}
          />

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={onApply}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg py-2.5 transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={onReset}
              className="w-full bg-zinc-50 hover:bg-zinc-100 text-zinc-600 text-sm font-medium rounded-lg py-2.5 transition-colors border border-zinc-200"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
