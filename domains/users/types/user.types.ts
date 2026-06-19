import { Order } from "@/domains/orders/types/order.types";

export type UserRole = "buyer" | "seller" | "admin";

export interface Address {
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phonenumber: string;
  isDefault: boolean;
  _id: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
}

export interface AdminUserDetailResponse {
  user: UserProfile;
  stats: {
    orderCount: number;
    totalSpent: number;
  };
  recentOrders: Order[];
}

export interface AdminUsersParams {
  role?: UserRole | "";
  search?: string;
  page?: number;
  limit?: number;
}
