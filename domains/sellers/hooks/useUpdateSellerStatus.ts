import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sellersApi } from "../api/sellers.api";
import { sellerKeys } from "./useAdminSellers";

export function useUpdateSellerStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      adminNote,
    }: {
      id: string;
      status: "approved" | "suspended";
      adminNote?: string;
    }) => sellersApi.adminUpdateSellerStatus(id, { status, adminNote }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sellerKeys.all });
    },
  });
}
