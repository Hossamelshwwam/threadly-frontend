"use client";

import { useCategoriesFlat } from "../../hooks/useCategoriesFlat";
import { RiPriceTag3Line } from "react-icons/ri";

interface CategoryFilterProps {
  selected?: string;
  onSelect: (value: string | undefined) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const { categories, isLoading } = useCategoriesFlat();

  return (
    <div>
      <label className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-2.5">
        <RiPriceTag3Line size={14} />
        Category
      </label>
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 bg-zinc-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <p className="text-xs text-zinc-400">No categories available</p>
      ) : (
        <div className="max-h-48 overflow-y-auto space-y-0.5 pr-1 scrollbar-thin">
          <button
            onClick={() => onSelect(undefined)}
            aria-pressed={!selected}
            className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
              !selected
                ? "bg-main text-main-subtle font-medium"
                : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() =>
                onSelect(selected === cat._id ? undefined : cat._id)
              }
              aria-pressed={selected === cat._id}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                selected === cat._id
                  ? "bg-main text-main-subtle font-medium"
                  : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
