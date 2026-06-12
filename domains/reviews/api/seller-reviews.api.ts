import { api } from "@/infrastructure/axios";
import type {
  SellerReviewsParams,
  SellerReviewsResponse,
} from "../types/review.types";

export const sellerReviewsApi = {
  listSellerReviews: async (
    params?: SellerReviewsParams,
  ): Promise<SellerReviewsResponse> => {
    const { data } = await api.get("/reviews/seller", { params });
    return data;
  },
};
