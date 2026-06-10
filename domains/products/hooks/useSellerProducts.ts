import { useQuery } from "@tanstack/react-query";
import { sellerProductsApi } from "../api/seller-products.api";
import { ProductsParams } from "../types/product.types";

const sellerProductsKey = {
  all: ["products"],
  sellerList: (params?: ProductsParams) =>
    [...sellerProductsKey.all, "seller", "list", params] as const,
  sellerDetail: (id: string) =>
    [...sellerProductsKey.all, "seller", "detail", id] as const,
};

export function useSellerProducts(params?: ProductsParams) {
  return useQuery({
    queryKey: sellerProductsKey.sellerList(params),
    queryFn: () => sellerProductsApi.getSellerProducts(params),
  });
}

export function useSellerProduct(id: string) {
  return useQuery({
    queryKey: sellerProductsKey.sellerDetail(id),
    queryFn: () => sellerProductsApi.getSellerProduct(id),
  });
}
