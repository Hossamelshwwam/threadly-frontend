import { UserProfile } from "@/domains/users/types/user.types";

export type SellerStatus = "pending" | "approved" | "suspended";

export interface SellerProfile {
  _id: string;
  bankDetails: {
    accountNumber: string;
    accountName: string;
    bankName: string;
  };
  userId: Pick<UserProfile, "_id" | "name" | "email">;
  storeName: string;
  description?: string;
  logo?: string;
  banner?: string;
  storeSlug: string;
  status: SellerStatus;
  adminNote?: string;
  rating?: number;
  totalSales?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSellersParams {
  status?: SellerStatus;
  search?: string;
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
