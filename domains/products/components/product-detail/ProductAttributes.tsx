"use client";

import type { ProductAttribute } from "@/domains/products/types/product.types";
import { RiListCheck } from "react-icons/ri";

interface ProductAttributesProps {
  attributes: ProductAttribute[];
}

export function ProductAttributes({ attributes }: ProductAttributesProps) {
  if (attributes.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="flex items-center gap-2 text-sm font-bold text-zinc-900 uppercase tracking-wider">
        <RiListCheck size={18} className="text-amber-500" />
        Product Details
      </h3>

      <div className="flex flex-col rounded-2xl border border-zinc-100 bg-zinc-50 overflow-hidden">
        {attributes.map((attr, idx) => (
          <div
            key={attr.key}
            className={`flex items-center justify-between p-4 text-sm ${
              idx !== attributes.length - 1 ? "border-b border-zinc-100" : ""
            }`}
          >
            <span className="font-medium text-zinc-500">{attr.key}</span>
            <span className="font-bold text-zinc-900 text-right">
              {attr.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
