"use client";

import { Stars } from "../../../storefront/components/shared/Stars";
import type { Product } from "@/domains/products/types/product.types";

interface ProductInfoProps {
  product: Product;
  displayPrice: number;
  basePrice: number;
  averageRating?: number;
  totalReviews?: number;
}

export function ProductInfo({
  product,
  displayPrice,
  basePrice,
  averageRating,
  totalReviews,
}: ProductInfoProps) {
  const categoryName =
    typeof product.categoryId === "object"
      ? product.categoryId.name
      : undefined;

  const sellerName =
    typeof product.sellerId === "object"
      ? product.sellerId.storeName
      : undefined;

  const hasDiscount = displayPrice !== basePrice;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2.5 text-xs text-zinc-500">
        {categoryName && (
          <span className="font-medium tracking-wider uppercase">
            {categoryName}
          </span>
        )}
        {sellerName && (
          <>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-600">{sellerName}</span>
          </>
        )}
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight text-balance">
        {product.name}
      </h1>

      {averageRating !== undefined && totalReviews !== undefined && (
        <div className="flex items-center gap-2.5">
          <Stars rating={averageRating} />
          <span className="text-sm text-zinc-500">
            {averageRating.toFixed(1)} ({totalReviews} reviews)
          </span>
        </div>
      )}

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-black text-zinc-900">
          EGP {displayPrice.toLocaleString()}
        </span>
        {hasDiscount && (
          <span className="text-lg text-zinc-400 line-through">
            EGP {basePrice.toLocaleString()}
          </span>
        )}
      </div>

      <p className="text-sm text-zinc-500 leading-relaxed text-pretty">
        {product.description}
      </p>
    </div>
  );
}
