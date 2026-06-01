import { api } from "@/infrastructure/axios";
import type { Product, AdminProductsParams } from "../types/product.types";
import type {
  PaginatedApiResponse,
  ApiResponse,
} from "@/shared/types/api.types";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../schemas/product.schema";

export const productsApi = {
  adminListProducts: async (
    params?: AdminProductsParams,
  ): Promise<PaginatedApiResponse<Product>> => {
    const cleanParams = { ...params };
    if (cleanParams.status === "") delete cleanParams.status;

    const { data } = await api.get("/products/admin", { params: cleanParams });
    return data;
  },

  adminForceArchive: async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await api.patch(`/products/admin/${id}/archive`);
    return data;
  },

  createProduct: async (
    payload: CreateProductInput,
  ): Promise<ApiResponse<Product>> => {
    const { data } = await api.post("/products", payload);
    return data;
  },

  getProduct: async (id: string): Promise<ApiResponse<Product>> => {
    const { data } = await api.get(`/products/admin/${id}`);
    return data;
  },

  updateProduct: async (
    id: string,
    payload: UpdateProductInput,
  ): Promise<ApiResponse<Product>> => {
    const { data } = await api.put(`/products/me/${id}`, payload);
    return data;
  },
};
