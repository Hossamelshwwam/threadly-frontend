import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "../api/products.api";
import type { ProductsParams } from "../types/product.types";

export const productKeys = {
  all: ["products"] as const,
  adminList: (params?: ProductsParams) =>
    [...productKeys.all, "admin", "list", params] as const,
  adminDetail: (id: string) =>
    [...productKeys.all, "admin", "detail", id] as const,
};

export function useAdminProducts(params?: ProductsParams) {
  return useQuery({
    queryKey: productKeys.adminList(params),
    queryFn: () => productsApi.adminListProducts(params),
  });
}

export function useAdminForceArchiveProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsApi.adminForceArchive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

export function useGetProduct(id: string) {
  return useQuery({
    queryKey: productKeys.adminDetail(id),
    queryFn: () => productsApi.getProduct(id),
    enabled: !!id,
  });
}
