import { api } from "@/infrastructure/axios";
import type {
  ApiResponse,
  PaginatedApiResponse,
} from "@/shared/types/api.types";
import type { Product, ProductsParams } from "../types/product.types";

export const sellerProductsApi = {
  getSellerProducts: async (params?: ProductsParams) => {
    const { data } = await api.get<PaginatedApiResponse<Product>>(
      "/products/me",
      { params },
    );
    return data;
  },

  getSellerProduct: async (productId: string) => {
    const { data } = await api.get<ApiResponse<Product>>(
      `/products/me/${productId}`,
    );
    return data;
  },
};
