import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { payoutsApi } from "../api/payouts.api";
import type {
  AdminPayoutsParams,
  AdminUpdatePayoutPayload,
} from "../types/payout.types";

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

export function useAdminUpdatePayout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: AdminUpdatePayoutPayload;
    }) => payoutsApi.adminUpdatePayout(id, payload), // Make sure to add adminUpdatePayout to your payoutsApi!
    onSuccess: (_, variables) => {
      // Refresh the specific payout and the general list stats
      queryClient.invalidateQueries({
        queryKey: payoutKeys.adminDetail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: payoutKeys.adminStats() });
      queryClient.invalidateQueries({ queryKey: payoutKeys.adminList() });
    },
  });
}
