import { api } from "@/infrastructure/axios";
import type {
  PayoutStats,
  AdminPayoutsParams,
  Payout,
} from "../types/payout.types";

export const payoutsApi = {
  adminGetStats: async (): Promise<{ data: PayoutStats }> => {
    const { data } = await api.get("/payouts/admin/stats");
    return data;
  },

  adminListPayouts: async (params?: AdminPayoutsParams) => {
    const { data } = await api.get("/payouts/admin", { params });
    return data;
  },

  adminGetPayout: async (id: string): Promise<{ data: Payout }> => {
    const { data } = await api.get(`/payouts/admin/${id}`);
    return data;
  },

  adminUpdatePayoutStatus: async (
    id: string,
    payload: { status: "processing" | "paid" | "rejected"; adminNote?: string },
  ): Promise<{ data: Payout }> => {
    const { data } = await api.patch(`/payouts/admin/${id}/status`, payload);
    return data;
  },
};
