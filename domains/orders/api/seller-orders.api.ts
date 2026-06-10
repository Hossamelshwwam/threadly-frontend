import { api } from "@/infrastructure/axios";
import type {
  ApiResponse,
  PaginatedApiResponse,
} from "@/shared/types/api.types";
import type {
  UpdateOrderItemPayload,
  OrderItem,
  OrdersItemsParams,
} from "../types/order.types";

export const sellerOrdersApi = {
  getSellerOrders: async (params?: OrdersItemsParams) => {
    const { data } = await api.get<PaginatedApiResponse<OrderItem>>(
      "/orders/seller",
      { params },
    );
    return data;
  },

  getSellerOrderItem: async (
    itemId: string,
  ): Promise<ApiResponse<OrderItem>> => {
    const { data } = await api.get<ApiResponse<OrderItem>>(
      `/orders/seller/items/${itemId}`,
    );

    return data;
  },

  updateOrderItemStatus: async (
    itemId: string,
    payload: UpdateOrderItemPayload,
  ): Promise<ApiResponse<OrderItem>> => {
    const { data } = await api.put<ApiResponse<OrderItem>>(
      `/orders/seller/items/${itemId}/status`,
      payload,
    );
    return data;
  },
};
