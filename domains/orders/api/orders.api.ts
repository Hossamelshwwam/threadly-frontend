import { api } from "@/infrastructure/axios";
import type {
  OrdersParams,
  AdminOrdersResponse,
  Order,
  OrderItem,
  AdminUpdateOrderPayload,
  UpdateOrderItemPayload,
} from "../types/order.types";
import type {
  ApiResponse,
  PaginatedApiResponse,
} from "@/shared/types/api.types";

export const ordersApi = {
  // Admin: List all platform transactions with active filtrations
  adminListOrders: async (
    params?: OrdersParams,
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
    itemId: string,
    payload: UpdateOrderItemPayload,
  ): Promise<ApiResponse<null>> => {
    const { data } = await api.put(
      `/orders/admin/items/${itemId}/status`,
      payload,
    );
    return data;
  },
};

export const buyerOrdersApi = {
  getMyOrders: async (
    params?: OrdersParams,
  ): Promise<PaginatedApiResponse<Order[]>> => {
    const cleanParams = { ...params };
    Object.keys(cleanParams).forEach((key) => {
      if (cleanParams[key as keyof OrdersParams] === "") {
        delete cleanParams[key as keyof OrdersParams];
      }
    });
    const { data } = await api.get("/orders", { params: cleanParams });
    return data;
  },

  getBuyerOrder: async (
    id: string,
  ): Promise<ApiResponse<{ order: Order; items: OrderItem[] }>> => {
    const { data } = await api.get(`/orders/get-order/${id}`);
    return data;
  },

  cancelOrderItem: async (itemId: string) => {
    const { data } = await api.put(`/orders/items/${itemId}/cancel`);
    return data;
  },

  getPendingReviews: async () => {
    const { data } = await api.get("/orders/pending-reviews");
    return data;
  },
};
