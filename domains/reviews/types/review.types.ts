import { ApiResponse } from "@/shared/types/api.types";

export interface Review {
  _id: string;
  orderItemId: string; // The specific item purchased
  buyerId: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  productId: string;
  sellerId: string;
  rating: number; // 1 to 5
  comment: string;
  images?: string[]; // Array of Cloudinary URLs
  createdAt: string;
  updatedAt: string;
}

export interface ReviewRatingBreakdown {
  "5": number;
  "4": number;
  "3": number;
  "2": number;
  "1": number;
}

export interface ReviewRequest {
  reviews: Review[];
  ratingBreakdown: ReviewRatingBreakdown;
  averageRating: number;
  totalReviews: number;
}

export type ProductReviewsResponse = ApiResponse<ReviewRequest> & {
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
};

export interface GetProductReviewsParams {
  rating?: number;
  sort?: "newest" | "oldest" | "rating_asc" | "rating_desc";
  page?: number;
  limit?: number;
}
