"use client";

import { useQuery } from "@tanstack/react-query";
import { sellerPayoutsApi } from "../api/seller-payouts.api";
import type { SellerPayoutsParams } from "../types/payout.types";

export const sellerPayoutKeys = {
  all: ["seller-payouts"] as const,
  list: (params?: SellerPayoutsParams) =>
    [...sellerPayoutKeys.all, "list", params] as const,
  detail: (id: string) => [...sellerPayoutKeys.all, "detail", id] as const,
};

export function useSellerPayouts(params?: SellerPayoutsParams) {
  return useQuery({
    queryKey: sellerPayoutKeys.list(params),
    queryFn: () => sellerPayoutsApi.listMyPayouts(params),
  });
}

export function useSellerPayout(id: string) {
  return useQuery({
    queryKey: sellerPayoutKeys.detail(id),
    queryFn: () => sellerPayoutsApi.getMyPayout(id),
    enabled: !!id,
  });
}
