"use client";

import React from "react";
import Image from "next/image";
import type { PendingReviewItem } from "../../types/review.types";

interface Props {
  item: PendingReviewItem;
}

export function ReviewItemHeader({ item }: Props) {
  return (
    <div className="p-6 border-b border-zinc-100 bg-zinc-50/50 flex items-center gap-4">
      <div className="h-16 w-16 relative bg-white border border-zinc-200 rounded-lg overflow-hidden shrink-0">
        <Image
          src={item.productId?.images?.[0] || "/placeholder.jpg"}
          alt="Product"
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="font-black text-zinc-900 text-lg leading-tight">
          {item.productId?.name}
        </h2>
        <p className="text-xs font-bold text-zinc-500 mt-1">
          Purchased from {item.sellerId?.storeName || "Threadly"}
        </p>
      </div>
    </div>
  );
}
