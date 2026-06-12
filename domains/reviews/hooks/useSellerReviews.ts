"use client";

import { useQuery } from "@tanstack/react-query";
import { sellerReviewsApi } from "../api/seller-reviews.api";
import type { SellerReviewsParams } from "../types/review.types";

export const sellerReviewKeys = {
  all: ["seller-reviews"] as const,
  list: (params?: SellerReviewsParams) =>
    [...sellerReviewKeys.all, "list", params] as const,
};

export function useSellerReviews(params?: SellerReviewsParams) {
  return useQuery({
    queryKey: sellerReviewKeys.list(params),
    queryFn: () => sellerReviewsApi.listSellerReviews(params),
  });
}
