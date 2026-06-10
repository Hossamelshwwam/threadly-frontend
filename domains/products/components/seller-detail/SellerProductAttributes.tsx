// domains/products/components/seller-detail/SellerProductAttributes.tsx
"use client";

import React from "react";
import { RiFileList3Line } from "react-icons/ri";
import type { Product } from "../../types/product.types";

export function SellerProductAttributes({
  attributes,
}: {
  attributes: Product["attributes"];
}) {
  return (
    <div className="bg-white border border-zinc-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
        <div className="p-2 bg-main-subtle rounded-lg">
          <RiFileList3Line className="text-main text-xl" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
            Specifications
          </h2>
        </div>
      </div>

      {!attributes || attributes.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-sm text-zinc-400">No specifications added.</p>
        </div>
      ) : (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {attributes.map((attr, idx) => (
            <div
              key={idx}
              className="flex flex-col border-b border-zinc-50 pb-2"
            >
              <dt className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                {attr.key}
              </dt>
              <dd className="text-sm font-semibold text-zinc-800">
                {attr.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
