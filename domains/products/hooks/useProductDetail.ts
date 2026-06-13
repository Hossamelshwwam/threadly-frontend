import { useQuery } from "@tanstack/react-query";
import { publicProductsApi } from "../api/public-products.api";

export const productDetailKeys = {
  all: ["product-detail"] as const,
  bySlug: (slug: string) => [...productDetailKeys.all, slug] as const,
};

export function useProductDetail(slug: string) {
  return useQuery({
    queryKey: productDetailKeys.bySlug(slug),
    queryFn: () => publicProductsApi.getProductBySlug(slug),
    enabled: !!slug,
  });
}