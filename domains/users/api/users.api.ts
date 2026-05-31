import { api } from "@/infrastructure/axios";
import type {
  AdminUsersParams,
  AdminUserDetailResponse,
  UserProfile,
} from "../types/user.types";
import type {
  PaginatedApiResponse,
  ApiResponse,
} from "@/shared/types/api.types";

export const usersApi = {
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
};
