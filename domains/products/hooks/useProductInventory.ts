import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { inventoryApi } from "../api/inventory.api";
import { productKeys } from "./useAdminProducts";
import type {
  CreateVariantInput,
  RestockVariantInput,
  UpdateVariantInput,
} from "../schemas/inventory.schema";

export const inventoryKeys = {
  all: ["inventory"] as const,
  byProduct: (productId: string) =>
    [...inventoryKeys.all, "product", productId] as const,
};

export function useProductVariants(productId: string) {
  return useQuery({
    queryKey: inventoryKeys.byProduct(productId),
    queryFn: () => inventoryApi.listVariants(productId),
    enabled: !!productId,
  });
}

export function useCreateVariant(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateVariantInput) =>
      inventoryApi.createVariant(productId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: inventoryKeys.byProduct(productId),
      });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

export function useRestockVariant(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      variantId,
      payload,
    }: {
      variantId: string;
      payload: RestockVariantInput;
    }) => inventoryApi.restockVariant(variantId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: inventoryKeys.byProduct(productId),
      });
    },
  });
}

export function useDeleteVariant(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variantId: string) => inventoryApi.deleteVariant(variantId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: inventoryKeys.byProduct(productId),
      });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

export function useUpdateVariant(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      variantId,
      payload,
    }: {
      variantId: string;
      payload: UpdateVariantInput;
    }) => inventoryApi.updateVariant(variantId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: inventoryKeys.byProduct(productId),
      });
    },
  });
}
