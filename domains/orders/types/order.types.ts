export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type PaymentMethod = "credit_card" | "cash_on_delivery";

export type ShippingAddress = {
  city: string;
  country: string;
  fullName: string;
  state: string;
  street: string;
  postalCode: string;
  phone: string;
};

export interface Order {
  _id: string;
  buyerId: {
    _id: string;
    name: string;
    email: string;
  };
  total: number;
  subtotal: number;
  status: OrderStatus;
  orderNumber: string;
  shippingAddress: ShippingAddress;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
}

export interface AdminOrdersResponse {
  data: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface AdminOrdersParams {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}
