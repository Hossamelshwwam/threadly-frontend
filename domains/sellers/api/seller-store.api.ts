import type { ApiResponse } from "@/shared/types/api.types";
import { SellerProfile } from "../types/seller.types";
import { api } from "@/infrastructure/axios";

// Payload for when a user registers to become a seller
export interface RegisterStorePayload {
  storeName: string;
  description?: string;
  bankDetails?: {
    bankName: string;
    accountName: string;
    accountNumber: string;
  };
}

export const sellerStoreApi = {
  // 1. Get the current logged-in seller's store profile
  getMyStore: async () => {
    const { data } =
      await api.get<ApiResponse<SellerProfile>>("/sellers/profile");
    return data;
  },

  // 2. Register a new store (Convert buyer -> seller)
  registerStore: async (payload: RegisterStorePayload) => {
    const { data } = await api.post<ApiResponse<SellerProfile>>(
      "/sellers/register",
      payload,
    );
    return data;
  },

  // 3. Update basic store info
  updateStoreProfile: async (payload: Partial<RegisterStorePayload>) => {
    const { data } = await api.put<ApiResponse<SellerProfile>>(
      "/sellers/profile",
      payload,
    );
    return data;
  },

  // 4. Upload branding (logo/banner) - Uses FormData for file uploads
  uploadBranding: async (type: "logo" | "banner", formData: FormData) => {
    const { data } = await api.patch<ApiResponse<SellerProfile>>(
      `/sellers/profile/${type}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return data;
  },

  getStoreDetails: async (
    slug: string,
  ): Promise<ApiResponse<SellerProfile>> => {
    // Replace with your actual endpoint for fetching store info
    const { data } = await api.get(`/sellers/stores/${slug}`);
    return data;
  },
};
