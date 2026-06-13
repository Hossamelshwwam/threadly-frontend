import { api } from "@/infrastructure/axios";
import type { AddCart, CartResponse, UpdateCartItemPayload } from "../types/cart.types";

export const cartApi = {
  addProductToCart: async (payload: AddCart) => {
    const { data } = await api.post(`/cart/items`, payload);
    return data;
  },

  getCart: async (): Promise<CartResponse> => {
    const { data } = await api.get(`/cart`);
    return data;
  },

  updateCartItem: async (
    inventoryId: string,
    payload: UpdateCartItemPayload,
  ) => {
    const { data } = await api.put(`/cart/items/${inventoryId}`, payload);
    return data;
  },

  removeCartItem: async (inventoryId: string) => {
    const { data } = await api.delete(`/cart/items/${inventoryId}`);
    return data;
  },
};