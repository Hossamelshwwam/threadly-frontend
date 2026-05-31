import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sellersApi } from "../api/sellers.api";
import type { AdminSellersParams } from "../types/seller.types";

export const sellerKeys = {
  all: ["sellers"] as const,
  adminList: (params?: AdminSellersParams) =>
    [...sellerKeys.all, "admin", "list", params] as const,
  adminDetail: (id: string) =>
    [...sellerKeys.all, "admin", "detail", id] as const,
};

export function useAdminSellers(params?: AdminSellersParams) {
  return useQuery({
    queryKey: sellerKeys.adminList(params),
    queryFn: () => sellersApi.adminListSellers(params),
  });
}

export function useAdminSeller(id: string) {
  return useQuery({
    queryKey: sellerKeys.adminDetail(id),
    queryFn: () => sellersApi.adminGetSeller(id),
    enabled: !!id,
  });
}
