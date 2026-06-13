import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "../api/cart.api";

export default function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      inventoryId,
      quantity,
    }: {
      inventoryId: string;
      quantity: number;
    }) => cartApi.updateCartItem(inventoryId, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
