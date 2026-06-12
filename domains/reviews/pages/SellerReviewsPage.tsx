"use client";

import React, { useState } from "react";
import { RiMessage2Line } from "react-icons/ri";

import { useSellerReviews } from "../hooks/useSellerReviews";
import { useGetMyStore } from "@/domains/sellers/hooks/useGetMyStore";
import { SellerReviewsFilterBar } from "../components/seller/SellerReviewsFilterBar";
import { SellerReviewCard } from "../components/seller/SellerReviewCard";
import { SellerReviewListSkeleton } from "../components/seller/SellerReviewListSkeleton";
import { SellerReviewEmptyState } from "../components/seller/SellerReviewEmptyState";
import { SellerReviewPagination } from "../components/seller/SellerReviewPagination";
import type { SortOption } from "../types/review.types";
import { FaSpinner } from "react-icons/fa";

export default function SellerReviewsPage() {
  const [rating, setRating] = useState<number | null>(null);
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: storeData, isLoading: storeLoading } = useGetMyStore();
  const { data: response, isLoading } = useSellerReviews({
    rating: rating ?? undefined,
    sort,
    page,
    limit,
  });

  const reviews = response?.data ?? [];
  const pagination = response?.pagination;

  if (storeLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <FaSpinner className="text-4xl text-amber-500 animate-spin mb-4" />
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
          <RiMessage2Line size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900">My Reviews</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            What customers are saying about your products.
          </p>
        </div>
      </div>

      <SellerReviewsFilterBar
        activeRating={rating}
        activeSort={sort}
        onRatingChange={(r) => {
          setRating(r);
          setPage(1);
        }}
        onSortChange={(s) => {
          setSort(s);
          setPage(1);
        }}
      />

      <div className="overflow-hidden">
        {isLoading ? (
          <SellerReviewListSkeleton />
        ) : reviews.length === 0 ? (
          <SellerReviewEmptyState
            hasActiveFilter={rating !== null}
            onClear={() => {
              setRating(null);
              setPage(1);
            }}
          />
        ) : (
          <div className="divide-y divide-zinc-100">
            {reviews.map((review) => (
              <SellerReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>

      {pagination && (
        <SellerReviewPagination
          page={page}
          totalPages={pagination.pages}
          total={pagination.total}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
