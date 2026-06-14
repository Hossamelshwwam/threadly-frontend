import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkoutApi } from "../api/checkout.api";
import { cartKeys } from "@/domains/cart/hooks/useCart";

export function usePlaceOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => checkoutApi.placeOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys?.all || ["cart"] });
    },
  });
}
