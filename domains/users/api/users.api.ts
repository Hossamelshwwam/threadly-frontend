import { api } from "@/infrastructure/axios";
import type {
  AdminUsersParams,
  AdminUserDetailResponse,
  UserProfile,
  Address,
} from "../types/user.types";
import type {
  PaginatedApiResponse,
  ApiResponse,
} from "@/shared/types/api.types";

export const usersApi = {
  getMe: async (): Promise<ApiResponse<UserProfile>> => {
    const { data } = await api.get("/users/me");
    return data;
  },

  adminListUsers: async (
    params?: AdminUsersParams,
  ): Promise<PaginatedApiResponse<UserProfile>> => {
    const { data } = await api.get("/users/admin", { params });
    return data;
  },

  adminGetUser: async (
    id: string,
  ): Promise<ApiResponse<AdminUserDetailResponse>> => {
    const { data } = await api.get(`/users/admin/${id}`);
    return data;
  },

  adminToggleUserStatus: async (
    id: string,
    isActive: boolean,
  ): Promise<ApiResponse<UserProfile>> => {
    const { data } = await api.patch(`/users/admin/${id}`, { isActive });
    return data;
  },

  getMyAddresses: async (): Promise<ApiResponse<Address[]>> => {
    const { data } = await api.get("/users/me/addresses");
    return data;
  },

  addAddress: async (payload: any): Promise<ApiResponse<Address[]>> => {
    const { data } = await api.post("/users/me/addresses", payload);
    return data;
  },
};
