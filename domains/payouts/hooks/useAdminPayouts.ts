import { useQuery } from "@tanstack/react-query";
import { payoutsApi } from "../api/payouts.api";
import type { AdminPayoutsParams } from "../types/payout.types";

export const payoutKeys = {
  all: ["payouts"] as const,
  adminStats: () => [...payoutKeys.all, "admin", "stats"] as const,
  adminList: (params?: AdminPayoutsParams) =>
    [...payoutKeys.all, "admin", "list", params] as const,
  adminDetail: (id: string) =>
    [...payoutKeys.all, "admin", "detail", id] as const,
};

export function useAdminPayoutStats() {
  return useQuery({
    queryKey: payoutKeys.adminStats(),
    queryFn: () => payoutsApi.adminGetStats(),
  });
}

export function useAdminPayouts(params?: AdminPayoutsParams) {
  return useQuery({
    queryKey: payoutKeys.adminList(params),
    queryFn: () => payoutsApi.adminListPayouts(params),
  });
}

export function useAdminPayout(id: string) {
  return useQuery({
    queryKey: payoutKeys.adminDetail(id),
    queryFn: () => payoutsApi.adminGetPayout(id),
    enabled: !!id,
  });
}
