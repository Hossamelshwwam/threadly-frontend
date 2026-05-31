export type SellerStatus = "pending" | "approved" | "suspended";

export interface SellerProfile {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  storeName: string;
  description?: string;
  logo?: string;
  banner?: string;
  slug: string;
  status: SellerStatus;
  adminNote?: string;
  rating?: number;
  totalReviews?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSellersParams {
  status?: SellerStatus;
  page?: number;
  limit?: number;
}

export interface AdminSellersResponse {
  data: SellerProfile[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
