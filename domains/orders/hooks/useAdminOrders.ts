import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "../api/orders.api";
import type { AdminOrdersParams } from "../types/order.types";

export const orderKeys = {
  all: ["orders"] as const,
  adminList: (params?: AdminOrdersParams) =>
    [...orderKeys.all, "admin", "list", params] as const,
};

export function useAdminOrders(params?: AdminOrdersParams) {
  return useQuery({
    queryKey: orderKeys.adminList(params),
    queryFn: () => ordersApi.adminListOrders(params),
  });
}
