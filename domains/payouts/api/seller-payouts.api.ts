import { api } from "@/infrastructure/axios";
import type {
  Payout,
  SellerPayoutsParams,
  SellerPayoutsResponse,
  SellerPayoutDetailResponse,
} from "../types/payout.types";

export const sellerPayoutsApi = {
  listMyPayouts: async (
    params?: SellerPayoutsParams,
  ): Promise<SellerPayoutsResponse> => {
    const cleanParams = { ...params };
    if (cleanParams.status === "") delete cleanParams.status;
    if (!cleanParams.from) delete cleanParams.from;
    if (!cleanParams.to) delete cleanParams.to;

    const { data } = await api.get("/payouts/seller", {
      params: cleanParams,
    });
    return data;
  },

  getMyPayout: async (id: string): Promise<SellerPayoutDetailResponse> => {
    const { data } = await api.get(`/payouts/seller/${id}`);
    return data;
  },
};
