export type PayoutStatus = "pending" | "processing" | "paid" | "rejected";

export interface PayoutSummary {
  _id: null | string;
  totalAmount: number;
  totalFees: number;
  totalNet: number;
  totalPaid: number;
  totalPending: number;
  totalProcessing: number;
  totalRejected: number;
}

export interface Payout {
  _id: string;
  sellerId: {
    _id: string;
    storeName: string;
    storeSlug?: string;
    bankDetails?: {
      accountName: string;
      accountNumber: string;
      bankName: string;
    };
  };
  orderId: {
    _id: string;
    orderNumber: string;
    total: number;
    createdAt: string;
  };
  amount: number;
  platformFee: number;
  netAmount: number;
  status: PayoutStatus;
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminPayoutsData {
  payouts: Payout[];
  summary: PayoutSummary;
}

export interface PaginatedPayoutsApiResponse {
  success: boolean;
  message?: string;
  data: AdminPayoutsData;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
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

export interface AdminUpdatePayoutPayload {
  status: PayoutStatus;
  adminNote?: string;
}

// --- Seller-specific types ---

export interface SellerPayoutSummary {
  totalEarned: number;
  totalFees: number;
  totalNet: number;
  totalPaid: number;
  totalPending: number;
  totalProcessing: number;
}

export interface SellerPayoutsParams {
  status?: PayoutStatus | "";
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export interface SellerPayoutsResponse {
  success: boolean;
  message?: string;
  data: {
    payouts: Payout[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
    summary: SellerPayoutSummary;
  };
}

export interface SellerPayoutDetailResponse {
  success: boolean;
  message?: string;
  data: Payout;
}
