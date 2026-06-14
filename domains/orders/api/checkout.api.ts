import { api } from "@/infrastructure/axios";
import type { ApiResponse } from "@/shared/types/api.types";
import type { Order } from "../types/order.types";

export const checkoutApi = {
  placeOrder: async (
    payload: any,
  ): Promise<ApiResponse<{ order: Order; orderItems: any[] }>> => {
    const { data } = await api.post("/orders", payload);
    return data;
  },
};
