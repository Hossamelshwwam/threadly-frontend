import { api } from "@/infrastructure/axios";
import type {
  AdminSellersParams,
  AdminSellersResponse,
  SellerProfile,
} from "../types/seller.types";

export const sellersApi = {
  adminListSellers: async (
    params?: AdminSellersParams,
  ): Promise<AdminSellersResponse> => {
    const { data } = await api.get("/sellers/admin", { params });
    return data;
  },

  adminGetSeller: async (id: string): Promise<{ data: SellerProfile }> => {
    const { data } = await api.get(`/sellers/admin/${id}`);
    return data;
  },

  adminUpdateSellerStatus: async (
    id: string,
    payload: { status: "approved" | "suspended"; adminNote?: string },
  ): Promise<{ data: SellerProfile }> => {
    const { data } = await api.patch(`/sellers/admin/${id}/status`, payload);
    return data;
  },
};
