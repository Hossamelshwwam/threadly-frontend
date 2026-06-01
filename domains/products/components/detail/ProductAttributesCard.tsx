"use client";

import React from "react";
import { RiListSettingsLine } from "react-icons/ri";
import type { Product } from "../../types/product.types";

interface ProductAttributesCardProps {
  attributes: Product["attributes"];
}

export function ProductAttributesCard({
  attributes,
}: ProductAttributesCardProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-6 space-y-5 font-sans shadow-xs">
      {/* Structural Header Block */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-100">
        <RiListSettingsLine className="text-amber-500 text-lg" />
        <div>
          <h2 className="text-base font-bold text-zinc-900">
            Specifications Matrix
          </h2>
          <p className="text-xs text-on-surface-muted mt-0.5">
            Technical specifications, attributes, and customized configuration
            options.
          </p>
        </div>
      </div>

      {/* Empty State Block */}
      {!attributes || attributes.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-sm font-medium text-zinc-400 italic">
            No custom attributes populated for this item listing.
          </p>
        </div>
      ) : (
        /* Micro-Card Dynamic Grid Container */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {attributes.map((attr, idx) => (
            <div
              key={idx}
              className="bg-zinc-50/70 border border-main rounded-lg p-4 flex flex-col gap-1.5 transition-colors hover:bg-zinc-50"
            >
              {/* Specification Label Key */}
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block truncate">
                {attr.key}
              </span>

              {/* Textarea Value Area */}
              <p className="text-sm text-on-surface font-semibold leading-relaxed whitespace-pre-wrap">
                {attr.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
