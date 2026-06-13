import { useState, useMemo } from "react";
import { ProductVariant } from "@/domains/products/types/inventory.types";
import { VariantSelection } from "../../storefront/types/variant-selection.types";

export function useVariantSelection(
  variants: ProductVariant[],
  basePrice: number,
): VariantSelection {
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();

  const hasVariants = variants.length > 0;

  const selectedVariant = useMemo(() => {
    return variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize,
    );
  }, [variants, selectedColor, selectedSize]);

  const displayPrice = selectedVariant ? selectedVariant.price : basePrice;

  const maxStock = selectedVariant
    ? selectedVariant.stock - selectedVariant.reserved
    : Math.max(...variants.map((v) => v.stock - v.reserved), 0);

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
