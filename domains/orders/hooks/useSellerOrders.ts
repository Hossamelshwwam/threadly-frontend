import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sellerOrdersApi } from "../api/seller-orders.api";
import type {
  OrdersItemsParams,
  UpdateOrderItemPayload,
} from "../types/order.types";

export const sellerOrdersKeys = {
  all: ["orders"] as const,
  list: (params?: OrdersItemsParams) =>
    [...sellerOrdersKeys.all, "list", params] as const,
};

export function useSellerOrders(params?: OrdersItemsParams) {
  return useQuery({
    queryKey: sellerOrdersKeys.list(params),
    queryFn: () => sellerOrdersApi.getSellerOrders(params),
  });
}

export function useSellerOrderItem(id: string) {
  return useQuery({
    queryKey: [...sellerOrdersKeys.all, "detail", id],
    queryFn: () => sellerOrdersApi.getSellerOrderItem(id),
    enabled: !!id,
  });
}

export function useUpdateSellerOrderStatus(itemId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateOrderItemPayload) =>
      sellerOrdersApi.updateOrderItemStatus(itemId, payload),
    onSuccess: () => {
      // Stream updates: clear both lists and details cache immediately
      queryClient.invalidateQueries({
        queryKey: [...sellerOrdersKeys.all, "detail", itemId],
      });
      queryClient.invalidateQueries({
        queryKey: [...sellerOrdersKeys.all, "list"],
      });
    },
  });
}
