import { api } from "@/infrastructure/axios";
import type {
  GetProductReviewsParams,
  ProductReviewsResponse,
} from "../types/review.types";
import type { ApiResponse } from "@/shared/types/api.types";

export const reviewsApi = {
  // Fetch reviews for a specific product
  getProductReviews: async (
    productId: string,
    params?: GetProductReviewsParams,
  ) => {
    const { data } = await api.get<ProductReviewsResponse>(
      `/reviews/products/${productId}`,
      { params },
    );
    return data;
  },

  // Admin action: Delete a malicious or fake review
  adminDeleteReview: async (reviewId: string) => {
    const { data } = await api.delete<ApiResponse<null>>(
      `/reviews/admin/${reviewId}`,
    );
    return data;
  },
};
