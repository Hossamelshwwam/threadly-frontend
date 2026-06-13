"use client";

import { useRef, useEffect } from "react";
import type { Product } from "@/domains/products/types/product.types";
import { ProductCard } from "../../../products/components/ProductCard";

interface ProductsGridProps {
  products: Product[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  totalCount?: number;
  onWishlistToggle?: (productId: string) => void;
  wishlistedIds?: Set<string>;
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100"
        >
          <div className="aspect-[4/5] bg-zinc-100 animate-pulse" />
          <div className="p-4 pt-3 space-y-2">
            <div className="h-4 w-3/4 bg-zinc-100 animate-pulse" />
            <div className="flex items-center justify-between">
              <div className="h-6 w-24 bg-amber-200 animate-pulse" />
              <div className="h-5 w-12 bg-amber-100 animate-pulse rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductsGrid({
  products,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  totalCount,
  onWishlistToggle,
  wishlistedIds,
}: ProductsGridProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <GridSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
          <svg
            className="w-7 h-7 text-zinc-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-zinc-800 mb-1">
          No products found
        </h3>
        <p className="text-sm text-zinc-400 max-w-xs">
          Try adjusting your filters or search terms to find what you&apos;re
          looking for.
        </p>
      </div>
    );
  }

  return (
    <div>
      {totalCount !== undefined && (
        <p className="text-sm text-zinc-500 mb-6">
          Showing {products.length}{" "}
          {totalCount > products.length && `of ${totalCount}`} results
        </p>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onWishlistToggle={onWishlistToggle}
            isWishlisted={wishlistedIds?.has(product._id)}
          />
        ))}
      </div>

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-10 mt-8" />

      {isFetchingNextPage && (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
        </div>
      )}

      {!hasNextPage && products.length > 0 && (
        <p className="text-center text-xs text-zinc-400 mt-8 pb-4">
          You&apos;ve reached the end
        </p>
      )}
    </div>
  );
}
