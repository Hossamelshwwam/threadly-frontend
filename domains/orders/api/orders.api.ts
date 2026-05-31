import { api } from "@/infrastructure/axios";
import type {
  AdminOrdersParams,
  AdminOrdersResponse,
} from "../types/order.types";

export const ordersApi = {
  adminListOrders: async (
    params?: AdminOrdersParams,
  ): Promise<AdminOrdersResponse> => {
    const { data } = await api.get("/orders/admin", { params });
    return data;
  },
};
