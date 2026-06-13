"use client";

import { RiMoneyDollarCircleLine } from "react-icons/ri";

interface PriceFilterProps {
  min?: string;
  max?: string;
  onChange: (key: "minPrice" | "maxPrice", value: string | undefined) => void;
}

export function PriceFilter({ min, max, onChange }: PriceFilterProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-2.5">
        <RiMoneyDollarCircleLine size={14} />
        Price Range (EGP)
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          inputMode="numeric"
          placeholder="Min"
          value={min ?? ""}
          onChange={(e) =>
            onChange("minPrice", e.target.value || undefined)
          }
          className="w-full bg-white border border-zinc-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition-all placeholder:text-zinc-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="text-zinc-300 text-xs shrink-0">—</span>
        <input
          type="number"
          inputMode="numeric"
          placeholder="Max"
          value={max ?? ""}
          onChange={(e) =>
            onChange("maxPrice", e.target.value || undefined)
          }
          className="w-full bg-white border border-zinc-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition-all placeholder:text-zinc-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
    </div>
  );
}
