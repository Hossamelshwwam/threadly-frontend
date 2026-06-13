import { useQuery } from "@tanstack/react-query";
import { publicProductsApi } from "../api/public-products.api";
import type { PublicProductsParams } from "../types/public-products.types";

export const publicProductKeys = {
  all: ["public-products"] as const,
  list: (params?: PublicProductsParams) =>
    [...publicProductKeys.all, "list", params] as const,
};

export function usePublicProducts(params?: PublicProductsParams) {
  return useQuery({
    queryKey: publicProductKeys.list(params),
    queryFn: () => publicProductsApi.listProducts(params),
  });
}