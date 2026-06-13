"use client";

import type { Product } from "@/domains/products/types/product.types";
import { Stars } from "@/domains/storefront/components/shared/Stars";
import { RiStore2Line, RiStarFill } from "react-icons/ri";

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
    typeof product.sellerId === "object" && product.sellerId !== null
      ? product.sellerId.storeName
      : undefined;
  const hasDiscount = displayPrice !== basePrice;

  return (
    <div className="flex flex-col">
      {/* Sleek Top Badges */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {categoryName && (
          <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-black uppercase tracking-widest text-zinc-600">
            {categoryName}
          </span>
        )}
        {sellerName && (
          <span className="flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            <RiStore2Line size={14} className="text-amber-400" />
            {sellerName}
          </span>
        )}
      </div>

      {/* Massive Editorial Title */}
      <h1 className="mb-6 text-4xl sm:text-5xl font-black tracking-tighter text-zinc-950 leading-[1.05] text-balance">
        {product.name}
      </h1>

      {/* Pricing & Reviews Row - Grouped tightly for impact */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-zinc-100 pb-8">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">
            Total Price
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-black text-amber-500">
              EGP {displayPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-xl font-bold text-zinc-300 line-through">
                EGP {basePrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {averageRating !== undefined &&
          totalReviews !== undefined &&
          totalReviews > 0 && (
            <a
              href="#reviews"
              className="group flex items-center gap-2 rounded-2xl bg-zinc-50 p-2 pr-4 transition-colors hover:bg-zinc-100"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                <RiStarFill size={18} className="text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-zinc-900">
                  {averageRating.toFixed(1)} Rating
                </span>
                <span className="text-xs font-bold text-zinc-500 group-hover:text-zinc-700">
                  Read {totalReviews} Reviews
                </span>
              </div>
            </a>
          )}
      </div>

      {/* Description */}
      <p className="text-base font-medium text-zinc-500 leading-relaxed text-pretty">
        {product.description}
      </p>
    </div>
  );
}
