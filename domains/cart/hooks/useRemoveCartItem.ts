import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "../api/cart.api";

export default function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inventoryId: string) => cartApi.removeCartItem(inventoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
