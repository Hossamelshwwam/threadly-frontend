import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "../api/products.api";
import { productKeys } from "./useAdminProducts";
import type { UpdateProductInput } from "../schemas/product.schema";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateProductInput;
    }) =>
      // Points to standard PUT updater route connection
      productsApi.updateProduct(id, payload),
    onSuccess: (_, variables) => {
      // Invalidate both the master list cache and the specific target item detail cache
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({
        queryKey: [...productKeys.all, "admin", "detail", variables.id],
      });
    },
  });
}
