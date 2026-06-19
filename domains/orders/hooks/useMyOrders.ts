import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buyerOrdersApi } from "../api/orders.api";
import { OrdersParams } from "../types/order.types";

export function useMyOrders(params: OrdersParams) {
  return useQuery({
    queryKey: ["my-orders", params],
    queryFn: () => buyerOrdersApi.getMyOrders(params),
    placeholderData: (previousData) => previousData, // Perf: Keeps old data visible while fetching the next page (prevents layout shift)
  });
}

export function useBuyerOrder(id: string) {
  return useQuery({
    queryKey: ["my-orders", "detail", id],
    queryFn: () => buyerOrdersApi.getBuyerOrder(id),
    enabled: !!id, // Prevent fetching if ID is missing
  });
}

export function useCancelOrderItem(orderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => buyerOrdersApi.cancelOrderItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-orders", "detail", orderId],
      });
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
}
