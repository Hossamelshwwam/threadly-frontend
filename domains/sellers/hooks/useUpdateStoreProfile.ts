import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  sellerStoreApi,
  type RegisterStorePayload,
} from "../api/seller-store.api";

export function useUpdateStoreProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<RegisterStorePayload>) =>
      sellerStoreApi.updateStoreProfile(payload),
    onSuccess: () => {
      // Invalidate to refresh the profile data across the app
      queryClient.invalidateQueries({ queryKey: ["my-store-profile"] });
    },
  });
}
