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

    const hasStockForColor = (color: string): boolean =>
      variants.some((v) => v.color === color && v.stock - v.reserved > 0);

    const hasStockForSize = (size: string): boolean =>
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

  const availableColorsForSize = useMemo(() => {
    if (!selectedSize) return colors;
    return colors.filter((color) =>
      variants.some(
        (v) =>
          v.color === color &&
          v.size === selectedSize &&
          v.stock - v.reserved > 0,
      ),
    );
  }, [variants, selectedSize, colors]);

  const isSizeOutOfStock = (size: string) =>
    selectedColor ? !availableSizesForColor.includes(size) : !hasStockForSize(size);

  const isColorOutOfStock = (color: string) =>
    selectedSize ? !availableColorsForSize.includes(color) : !hasStockForColor(color);

  return (
    <div className="space-y-6">
      {/* Color */}
      {colors.length > 0 && (
        <div>
          <label className="block text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-3">
            Color{selectedColor && <span className="ml-1.5 text-amber-600 normal-case">— {selectedColor}</span>}
          </label>
          <div className="flex flex-wrap gap-2.5 overflow-hidden">
            {colors.map((color) => {
              const outOfStock = isColorOutOfStock(color);
              return (
                <button
                  key={color}
                  disabled={outOfStock}
                  aria-pressed={selectedColor === color}
                  onClick={() =>
                    onColorChange(selectedColor === color ? undefined : color)
                  }
                  className={`relative px-4 py-2 text-sm rounded-lg border transition-all truncate max-w-[160px] ${
                    selectedColor === color
                      ? "border-amber-500 bg-amber-50 text-amber-700 font-medium"
                      : outOfStock
                        ? "border-zinc-100 bg-zinc-50 text-zinc-300 cursor-not-allowed line-through"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                  }`}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size */}
      {sizes.length > 0 && (
        <div>
          <label className="block text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-3">
            Size{selectedSize && <span className="ml-1.5 text-amber-600 normal-case">— {selectedSize}</span>}
          </label>
          <div className="flex flex-wrap gap-2.5">
            {sizes.map((size) => {
              const outOfStock = isSizeOutOfStock(size);
              return (
                <button
                  key={size}
                  disabled={outOfStock}
                  aria-pressed={selectedSize === size}
                  onClick={() =>
                    onSizeChange(selectedSize === size ? undefined : size)
                  }
                  className={`w-12 h-12 flex items-center justify-center text-sm font-medium rounded-lg border transition-all ${
                    selectedSize === size
                      ? "border-amber-500 bg-amber-50 text-amber-700"
                      : outOfStock
                        ? "border-zinc-100 bg-zinc-50 text-zinc-300 cursor-not-allowed line-through"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
