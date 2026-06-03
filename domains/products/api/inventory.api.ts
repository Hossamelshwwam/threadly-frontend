import { api } from "@/infrastructure/axios";
import type { ApiResponse } from "@/shared/types/api.types";
import type {
  CreateVariantInput,
  RestockVariantInput,
  UpdateVariantInput,
} from "../schemas/inventory.schema";
import { ProductVariant } from "../types/inventory.types";

export const inventoryApi = {
  // 1. List Product Variants
  listVariants: async (
    productId: string,
  ): Promise<ApiResponse<ProductVariant[]>> => {
    const { data } = await api.get(`/inventory/${productId}/variants`);
    return data;
  },

  // 2. Add Single Variant
  createVariant: async (
    productId: string,
    payload: CreateVariantInput,
  ): Promise<ApiResponse<ProductVariant>> => {
    const { data } = await api.post(
      `/inventory/${productId}/variants`,
      payload,
    );
    return data;
  },

  // 3. Update Variant
  updateVariant: async (
    variantId: string,
    payload: UpdateVariantInput,
  ): Promise<ApiResponse<ProductVariant>> => {
    const { data } = await api.put(`/inventory/variants/${variantId}`, payload);
    return data;
  },

  // 4. Restock Variant (Add Quantity)
  restockVariant: async (
    variantId: string,
    payload: RestockVariantInput,
  ): Promise<ApiResponse<{ newStock: number }>> => {
    const { data } = await api.patch(
      `/inventory/variants/${variantId}/restock`,
      payload,
    );
    return data;
  },

  // 5. Delete Variant
  deleteVariant: async (variantId: string): Promise<ApiResponse<null>> => {
    const { data } = await api.delete(`/inventory/variants/${variantId}`);
    return data;
  },
};
