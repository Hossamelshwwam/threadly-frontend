import { api } from "@/infrastructure/axios";
import type { AdminSellersParams, SellerProfile } from "../types/seller.types";
import type {
  PaginatedApiResponse,
  ApiResponse,
} from "@/shared/types/api.types";

export const sellersApi = {
  adminListSellers: async (
    params?: AdminSellersParams,
  ): Promise<PaginatedApiResponse<SellerProfile>> => {
    const cleanParams = { ...params };
    if (!cleanParams.status) delete cleanParams.status;

    const { data } = await api.get("/sellers/admin", { params: cleanParams });
    return data;
  },

  adminGetSeller: async (id: string): Promise<ApiResponse<SellerProfile>> => {
    const { data } = await api.get(`/sellers/admin/${id}`);
    return data;
  },

  adminUpdateSellerStatus: async (
    id: string,
    payload: { status: "approved" | "suspended"; adminNote?: string },
  ): Promise<ApiResponse<SellerProfile>> => {
    const { data } = await api.patch(`/sellers/admin/${id}/status`, payload);
    return data;
  },
};
