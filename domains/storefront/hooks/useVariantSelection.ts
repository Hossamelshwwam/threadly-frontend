import { useState, useEffect, useMemo } from "react";
import { ProductVariant } from "@/domains/products/types/inventory.types";
import { VariantSelection } from "../types/variant-selection.types";

export function useVariantSelection(
  variants: ProductVariant[],
  basePrice: number,
  slug: string,
): VariantSelection {
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();

  const hasVariants = variants.length > 0;

  const selectedVariant = useMemo(() => {
    if (!selectedColor && !selectedSize && variants.length === 1) {
      return variants[0];
    }
    return variants.find(
      (v) =>
        (!selectedColor || v.color === selectedColor) &&
        (!selectedSize || v.size === selectedSize),
    );
  }, [variants, selectedColor, selectedSize]);

  const displayPrice = selectedVariant
    ? selectedVariant.price
    : basePrice;

  const maxStock = selectedVariant
    ? selectedVariant.stock - selectedVariant.reserved
    : Math.max(...variants.map((v) => v.stock - v.reserved), 0);

  useEffect(() => {
    setSelectedColor(undefined);
    setSelectedSize(undefined);
  }, [slug]);

  return {
    selectedColor,
    selectedSize,
    selectedVariant,
    displayPrice,
    maxStock,
    hasVariants,
    setSelectedColor,
    setSelectedSize,
  };
}
