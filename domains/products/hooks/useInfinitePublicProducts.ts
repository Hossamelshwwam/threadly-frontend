import { useInfiniteQuery } from "@tanstack/react-query";
import { publicProductsApi } from "../api/public-products.api";
import type { PublicProductsParams } from "../types/public-products.types";

export function useInfinitePublicProducts(
  params?: Omit<PublicProductsParams, "page" | "limit">,
  enabled = true,
) {
  return useInfiniteQuery({
    queryKey: ["infinite-products", params],
    queryFn: ({ pageParam = 1 }) =>
      publicProductsApi.listProducts({ ...params, page: pageParam, limit: 12 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pages } = lastPage.pagination;
      return page < pages ? page + 1 : undefined;
    },
    enabled: enabled,
  });
}
