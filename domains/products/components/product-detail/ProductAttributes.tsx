import type { ProductAttribute } from "@/domains/products/types/product.types";

interface ProductAttributesProps {
  attributes: ProductAttribute[];
}

export function ProductAttributes({ attributes }: ProductAttributesProps) {
  if (attributes.length === 0) return null;

  return (
    <div>
      <label className="block text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-2.5">
        Details
      </label>
      <div className="flex flex-wrap gap-x-6 gap-y-1">
        {attributes.map((attr) => (
          <div key={attr.key} className="flex items-center gap-1.5">
            <span className="text-xs text-zinc-400">{attr.key}:</span>
            <span className="text-sm text-zinc-700 font-medium">
              {attr.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
