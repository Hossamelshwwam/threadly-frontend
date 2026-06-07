import { useQuery } from "@tanstack/react-query";
import { reviewsApi } from "../api/reviews.api";
import type { GetProductReviewsParams } from "../types/review.types";

export function useProductReviews(
  productId: string,
  params?: GetProductReviewsParams,
) {
  return useQuery({
    queryKey: ["product-reviews", productId, params],
    queryFn: () => reviewsApi.getProductReviews(productId, params),
    enabled: !!productId,
  });
}
