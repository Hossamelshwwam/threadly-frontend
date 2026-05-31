import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../api/users.api";
import type { AdminUsersParams } from "../types/user.types";

export const userKeys = {
  all: ["users"] as const,
  adminList: (params?: AdminUsersParams) =>
    [...userKeys.all, "admin", "list", params] as const,
  adminDetail: (id: string) =>
    [...userKeys.all, "admin", "detail", id] as const,
};

export function useAdminUsers(params?: AdminUsersParams) {
  return useQuery({
    queryKey: userKeys.adminList(params),
    queryFn: () => usersApi.adminListUsers(params),
  });
}

export function useAdminUser(id: string) {
  return useQuery({
    queryKey: userKeys.adminDetail(id),
    queryFn: () => usersApi.adminGetUser(id),
    enabled: !!id,
  });
}
