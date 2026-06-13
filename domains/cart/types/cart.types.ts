import type { Product } from "@/domains/products/types/product.types";
import type { ApiResponse } from "@/shared/types/api.types";

export interface AddCart {
  productId: string;
  inventoryId: string;
  quantity: number;
}

export interface CartItem {
  inventoryId: string;
  productId: Product;
  quantity: number;
  priceSnapshot: number;
}

export interface Cart {
  total: number;
  items: CartItem[];
  itemCount: number;
}

export interface UpdateCartItemPayload {
  quantity: number;
}

export type CartResponse = ApiResponse<Cart>;
