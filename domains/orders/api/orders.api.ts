import { api } from "@/infrastructure/axios";
import type {
  AdminOrdersParams,
  AdminOrdersResponse,
  Order,
  OrderItem,
  AdminUpdateOrderPayload,
  AdminUpdateOrderItemPayload,
} from "../types/order.types";
import type { ApiResponse } from "@/shared/types/api.types";

export const ordersApi = {
  // Admin: List all platform transactions with active filtrations
  adminListOrders: async (
    params?: AdminOrdersParams,
  ): Promise<AdminOrdersResponse> => {
    const cleanParams = { ...params };
    if (cleanParams.status === "") delete cleanParams.status;
    if (cleanParams.paymentStatus === "") delete cleanParams.paymentStatus;

    const { data } = await api.get("/orders/admin", { params: cleanParams });
    return data;
  },

  // Admin: Fetch structural contexts for a single order head and its child sub-items
  adminGetOrderDetail: async (
    id: string,
  ): Promise<ApiResponse<{ order: Order; items: OrderItem[] }>> => {
    const { data } = await api.get(`/orders/admin/${id}`);
    return data;
  },

  // Admin: Patch global order states or transaction settlement codes
  adminUpdateOrder: async (
    id: string,
    payload: AdminUpdateOrderPayload,
  ): Promise<ApiResponse<null>> => {
    const { data } = await api.patch(`/orders/admin/${id}`, payload);
    return data;
  },

  // Admin: Update individual order item fulfillment state and tracking
  adminUpdateOrderItem: async (
    orderId: string,
    itemId: string,
    payload: AdminUpdateOrderItemPayload,
  ): Promise<ApiResponse<null>> => {
    const { data } = await api.put(
      `/orders/admin/items/${itemId}/status`,
      payload,
    );
    return data;
  },
};
