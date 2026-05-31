export type PayoutStatus = "pending" | "processing" | "paid" | "rejected";

export interface Payout {
  _id: string;
  sellerId: {
    _id: string;
    storeName: string;
  };
  orderId: string;
  grossAmount: number;
  platformFee: number;
  netAmount: number;
  status: PayoutStatus;
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PayoutStats {
  pending: { count: number; netAmount: number };
  processing: { count: number; netAmount: number };
  paid: { count: number; netAmount: number };
  rejected: { count: number; netAmount: number };
}

export interface AdminPayoutsParams {
  status?: PayoutStatus;
  seller?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}
