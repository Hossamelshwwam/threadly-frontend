"use client";

import { useState, useMemo, useCallback } from "react";
import { RiFilter3Line } from "react-icons/ri";
import { useInfinitePublicProducts } from "@/domains/products/hooks/useInfinitePublicProducts";
import {
  FilterSidebar,
  type FiltersState,
} from "../../storefront/components/filters/FilterSidebar";
import { ProductsGrid } from "../../storefront/components/sections/ProductsGrid";
import { MobileFilterSheet } from "../../../shared/components/buyer/MobileFilterSheet";

const DEFAULT_FILTERS: FiltersState = {};

export default function ProductsPage() {
  const [appliedFilters, setAppliedFilters] =
    useState<FiltersState>(DEFAULT_FILTERS);
  const [draftFilters, setDraftFilters] =
    useState<FiltersState>(DEFAULT_FILTERS);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const apiParams = useMemo(() => {
    const params: Record<string, unknown> = {};
    if (appliedFilters.search) params.search = appliedFilters.search;
    if (appliedFilters.sort) params.sort = appliedFilters.sort;
    if (appliedFilters.category) params.category = appliedFilters.category;
    if (appliedFilters.minPrice)
      params.minPrice = Number(appliedFilters.minPrice);
    if (appliedFilters.maxPrice)
      params.maxPrice = Number(appliedFilters.maxPrice);
    return params;
  }, [appliedFilters]);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfinitePublicProducts(apiParams);

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const totalCount = data?.pages?.[0]?.pagination?.total;

  const appliedFilterCount = useMemo(
    () =>
      Object.values(appliedFilters).filter((v) => v !== undefined && v !== "")
        .length,
    [appliedFilters],
  );

  const handleFilterChange = useCallback(
    (key: string, value: string | undefined) => {
      setDraftFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleApply = useCallback(() => {
    setAppliedFilters({ ...draftFilters });
  }, [draftFilters]);

  const handleReset = useCallback(() => {
    setDraftFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  return (
    <div className="container mx-auto px-8 py-8 pt-28">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 text-balance">
            Products
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            {totalCount !== undefined
              ? `${totalCount} products available`
              : "Browse our collection"}
          </p>
        </div>
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-xl px-4 py-2.5 hover:border-amber-300 hover:text-amber-600 transition-all"
        >
          <RiFilter3Line size={16} />
          Filters
          {appliedFilterCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-[10px] font-bold text-white">
              {appliedFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-10">
        <div className="hidden lg:block">
          <FilterSidebar
            filters={draftFilters}
            onFilterChange={handleFilterChange}
            onApply={handleApply}
            onReset={handleReset}
            appliedFilterCount={appliedFilterCount}
          />
        </div>

        <MobileFilterSheet
          open={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
          filters={draftFilters}
          onFilterChange={handleFilterChange}
          onApply={handleApply}
          onReset={handleReset}
          appliedFilterCount={appliedFilterCount}
        />

        <div className="flex-1 min-w-0">
          <ProductsGrid
            products={products}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage ?? false}
            fetchNextPage={fetchNextPage}
            totalCount={totalCount}
            onWishlistToggle={toggleWishlist}
            wishlistedIds={wishlist}
          />
        </div>
      </div>
    </div>
  );
}
