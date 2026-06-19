"use client";

import React from "react";
import { RiShoppingBag3Line, RiLoader4Line } from "react-icons/ri";
import Image from "next/image";

import CustomButton from "@/shared/components/custom-button/custom-button";
import { useStoreDetails } from "../hooks/useStoreDetails";
import { StorefrontSkeleton } from "../components/store/StorefrontSkeleton";
import { StoreHeader } from "../components/store/StoreHeader";
import { useInfinitePublicProducts } from "@/domains/products/hooks/useInfinitePublicProducts"; // Adjust path if needed
import { ProductCard } from "@/domains/products/components/ProductCard";

interface Props {
  slug: string;
}

export default function StorefrontPage({ slug }: Props) {
  // 1. Fetch Store Profile
  const {
    data: storeRes,
    isLoading: isLoadingStore,
    error: storeError,
  } = useStoreDetails(slug);

  const store = storeRes?.data;

  // 2. Fetch Products infinitely (tied to the seller ID once available)
  const {
    data: productsRes,
    isLoading: isLoadingProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePublicProducts(
    // Only pass seller ID if store is loaded
    store?._id ? { seller: store._id } : undefined,
    store?._id ? true : false,
  );

  const isLoading = isLoadingStore || isLoadingProducts;

  // Flatten the pages array from infinite query into a single products array
  const products = productsRes?.pages.flatMap((page) => page.data) || [];

  // Get the total count from the first page's pagination metadata
  const totalProducts =
    productsRes?.pages[0]?.pagination?.total || products.length;

  if (isLoading && !store) {
    return <StorefrontSkeleton />;
  }

  if (storeError || !store) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 font-sans animate-fadeIn">
        <RiShoppingBag3Line className="text-6xl text-zinc-300 mb-4" />
        <h1 className="text-2xl font-black text-zinc-900 mb-2">
          Store not found
        </h1>
        <p className="text-zinc-500 font-medium">
          This store might have been removed or the URL is incorrect.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans animate-fadeIn">
      {/* 1. Store Profile Header */}
      <StoreHeader store={store} />

      {/* 2. Store Products Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-8 border-b border-zinc-200 pb-4">
          <h2 className="text-xl font-black text-zinc-900 flex items-center gap-2">
            All Products{" "}
            <span className="bg-zinc-100 text-zinc-600 text-xs px-2 py-1 rounded-lg">
              {totalProducts}
            </span>
          </h2>
        </div>

        {products.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-3xl p-16 text-center shadow-sm">
            <RiShoppingBag3Line className="mx-auto text-5xl text-zinc-300 mb-4" />
            <h3 className="text-lg font-black text-zinc-900">
              No products available
            </h3>
            <p className="text-zinc-500 mt-1 font-medium">
              This seller hasn&apos;t listed any items yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        )}

        {/* Load More Button (Infinite Query) */}
        {hasNextPage && (
          <div className="mt-12 flex justify-center">
            <CustomButton
              variant="outline"
              theme="neutral"
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
              className="font-bold rounded-xl px-8 h-12"
            >
              {isFetchingNextPage ? (
                <span className="flex items-center gap-2">
                  <RiLoader4Line className="animate-spin" size={18} />
                  Loading...
                </span>
              ) : (
                "Load More Products"
              )}
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
}
