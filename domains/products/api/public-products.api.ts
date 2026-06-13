import { api } from "@/infrastructure/axios";
import type {
  GetProductBySlugResponse,
  ListProductsResponse,
  PublicProductsParams,
} from "../types/public-products.types";

export const publicProductsApi = {
  listProducts: async (params?: PublicProductsParams) => {
    const { data } = await api.get<ListProductsResponse>("/products", {
      params: { status: "active", ...params },
    });
    return data;
  },

  getProductBySlug: async (slug: string) => {
    const { data } = await api.get<GetProductBySlugResponse>(
      `/products/${slug}`,
    );
    return data.data;
  },
};