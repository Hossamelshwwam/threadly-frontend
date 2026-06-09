import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sellerStoreApi } from "../api/seller-store.api";

interface UploadVariables {
  type: "logo" | "banner";
  file: File;
}

export function useUploadBranding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ type, file }: UploadVariables) => {
      const formData = new FormData();
      formData.append("image", file);
      return sellerStoreApi.uploadBranding(type, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-store-profile"] });
    },
  });
}
