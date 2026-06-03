import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productKeys } from "./useAdminProducts";
import { productsApi } from "../api/products.api";

export function useUploadProductImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, files }: { id: string; files: File[] }) =>
      productsApi.uploadImages(id, files),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...productKeys.all, "admin", "detail", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

export function useDeleteProductImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, imageUrl }: { id: string; imageUrl: string }) =>
      productsApi.deleteImage(id, imageUrl),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...productKeys.all, "admin", "detail", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}
