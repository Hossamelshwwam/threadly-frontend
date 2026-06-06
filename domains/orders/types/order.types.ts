export type OrderStatus =
  | "pending"
  | "confirmed"
  | "partially_shipped"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "unpaid" | "paid" | "refunded";

export type PaymentMethod = "credit_card" | "cash_on_delivery";

export type OrderItemStatus =
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type ShippingAddress = {
  city: string;
  country: string;
  fullName: string;
  state: string;
  street: string;
  postalCode: string;
  phone: string;
};

export interface OrderItem {
  _id: string;
  orderId: string;
  color: string;
  size: string;
  inventoryId: string;
  productName: string;
  productId: {
    _id: string;
    name: string;
    slug: string;
    images: string[];
  };
  sellerId: null | {
    _id: string;
    storeName: string;
  };
  quantity: number;
  unitPrice: number;
  status: OrderItemStatus;
  total: number;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

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
  status?: OrderStatus | "";
  paymentStatus?: PaymentStatus | "";
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export interface AdminUpdateOrderPayload {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
}

export interface AdminUpdateOrderItemPayload {
  status?: OrderItemStatus;
  trackingNumber?: string;
}
