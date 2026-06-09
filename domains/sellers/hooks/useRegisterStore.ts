import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sellerStoreApi, RegisterStorePayload } from "../api/seller-store.api";
import { useRouter } from "next/navigation";

export function useRegisterStore() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterStorePayload) =>
      sellerStoreApi.registerStore(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-store-profile"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/seller");
    },
  });
}
