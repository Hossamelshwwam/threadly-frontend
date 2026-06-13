"use client";

import { useMemo } from "react";
import type { ProductVariant } from "@/domains/products/types/inventory.types";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedColor?: string;
  selectedSize?: string;
  onColorChange: (color: string | undefined) => void;
  onSizeChange: (size: string | undefined) => void;
}

export function VariantSelector({
  variants,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}: VariantSelectorProps) {
  const { colors, sizes, hasStockForColor, hasStockForSize } = useMemo(() => {
    const colorSet = new Set<string>();
    const sizeSet = new Set<string>();
    for (const v of variants) {
      if (v.color) colorSet.add(v.color);
      if (v.size) sizeSet.add(v.size);
    }
    const colors = Array.from(colorSet);
    const sizes = Array.from(sizeSet);
    const hasStockForColor = (color: string) =>
      variants.some((v) => v.color === color && v.stock - v.reserved > 0);
    const hasStockForSize = (size: string) =>
      variants.some((v) => v.size === size && v.stock - v.reserved > 0);
    return { colors, sizes, hasStockForColor, hasStockForSize };
  }, [variants]);

  if (variants.length === 0) return null;

  const availableSizesForColor = useMemo(() => {
    if (!selectedColor) return sizes;
    return sizes.filter((size) =>
      variants.some(
        (v) =>
          v.color === selectedColor &&
          v.size === size &&
          v.stock - v.reserved > 0,
      ),
    );
  }, [variants, selectedColor, sizes]);

  // Only display sizes that are actually available for the selected color
  const displaySizes = selectedColor ? availableSizesForColor : sizes;

  return (
    <div className="flex flex-col gap-8">
      {/* Colors */}
      {colors.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <span className="text-sm font-bold uppercase tracking-widest text-zinc-900">
              Color
            </span>
            <span className="text-sm font-bold text-zinc-500">
              {selectedColor || "None selected"}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => {
              const outOfStock = !hasStockForColor(color);
              const isSelected = selectedColor === color;

              return (
                <button
                  key={color}
                  disabled={outOfStock}
                  onClick={() => onColorChange(isSelected ? undefined : color)}
                  className={`group relative flex h-14 items-center justify-center rounded-2xl px-6 text-sm font-black transition-all duration-200 ${
                    isSelected
                      ? "bg-zinc-950 text-white ring-4 ring-zinc-950/20 ring-offset-2"
                      : outOfStock
                        ? "bg-zinc-100 text-zinc-300 cursor-not-allowed"
                        : "bg-white border-2 border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-950"
                  }`}
                >
                  {color}
                  {outOfStock && (
                    <div className="absolute inset-0 h-px w-full -rotate-12 bg-zinc-300 top-1/2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Sizes */}
      {displaySizes.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <span className="text-sm font-bold uppercase tracking-widest text-zinc-900">
              Size
            </span>
            <span className="text-sm font-bold text-zinc-500">
              {selectedSize || "None selected"}
            </span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {displaySizes.map((size) => {
              const outOfStock = !hasStockForSize(size);
              const isSelected = selectedSize === size;

              return (
                <button
                  key={size}
                  disabled={outOfStock}
                  onClick={() => onSizeChange(isSelected ? undefined : size)}
                  className={`group relative flex h-14 items-center justify-center rounded-2xl text-base font-black transition-all duration-200 ${
                    isSelected
                      ? "bg-zinc-950 text-white ring-4 ring-zinc-950/20 ring-offset-2"
                      : outOfStock
                        ? "bg-zinc-100 text-zinc-300 cursor-not-allowed"
                        : "bg-white border-2 border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-950"
                  }`}
                >
                  {size}
                  {outOfStock && (
                    <div className="absolute inset-0 h-px w-full -rotate-45 bg-zinc-300 top-1/2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
