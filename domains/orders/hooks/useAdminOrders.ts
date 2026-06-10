import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "../api/orders.api";
import type {
  OrdersParams,
  UpdateOrderItemPayload,
  AdminUpdateOrderPayload,
} from "../types/order.types";

export const orderKeys = {
  all: ["orders"] as const,
  adminList: (params?: OrdersParams) =>
    [...orderKeys.all, "admin", "list", params] as const,
  adminDetail: (id: string) =>
    [...orderKeys.all, "admin", "detail", id] as const,
};

export function useAdminOrders(params?: OrdersParams) {
  return useQuery({
    queryKey: orderKeys.adminList(params),
    queryFn: () => ordersApi.adminListOrders(params),
  });
}

export function useAdminOrderDetail(id: string) {
  return useQuery({
    queryKey: orderKeys.adminDetail(id),
    queryFn: () => ordersApi.adminGetOrderDetail(id),
    enabled: !!id,
  });
}

export function useAdminUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: AdminUpdateOrderPayload;
    }) => ordersApi.adminUpdateOrder(id, payload),
    onSuccess: (_, variables) => {
      // Refresh the ledger table index and single detailed summary dashboards together
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      queryClient.invalidateQueries({
        queryKey: orderKeys.adminDetail(variables.id),
      });
    },
  });
}

export function useAdminUpdateOrderItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      itemId,
      payload,
    }: {
      orderId: string;
      itemId: string;
      payload: UpdateOrderItemPayload;
    }) => ordersApi.adminUpdateOrderItem(orderId, itemId, payload),
    onSuccess: (_, variables) => {
      // Instantly refresh the order details page so the new tracking & status show up
      queryClient.invalidateQueries({
        queryKey: orderKeys.adminDetail(variables.orderId),
      });
    },
  });
}
