import { api } from "@/infrastructure/axios";
import type {
  AdminCategoriesQueryParams,
  Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "../types/category.types";
import type {
  ApiResponse,
  PaginatedApiResponse,
} from "@/shared/types/api.types";

export const categoriesApi = {
  listCategories: async (): Promise<ApiResponse<Category[]>> => {
    const { data } = await api.get("/categories");
    return data;
  },

  adminListFlat: async (
    params?: AdminCategoriesQueryParams,
  ): Promise<PaginatedApiResponse<Category>> => {
    const { data } = await api.get("/categories/admin", { params });
    return data;
  },

  adminCreateCategory: async (
    payload: CreateCategoryPayload,
  ): Promise<ApiResponse<Category>> => {
    const { data } = await api.post("/categories/admin", payload);
    return data;
  },

  adminUpdateCategory: async (
    id: string,
    payload: UpdateCategoryPayload,
  ): Promise<ApiResponse<Category>> => {
    const { data } = await api.put(`/categories/admin/${id}`, payload);
    return data;
  },

  adminDeleteCategory: async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await api.delete(`/categories/admin/${id}`);
    return data;
  },

  adminUploadImage: async (
    id: string,
    file: File,
  ): Promise<ApiResponse<{ image: string }>> => {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await api.patch(
      `/categories/admin/${id}/image`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return data;
  },
};
