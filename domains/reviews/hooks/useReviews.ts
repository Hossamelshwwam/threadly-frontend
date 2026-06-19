import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { buyerOrdersApi } from "@/domains/orders/api/orders.api";
import { reviewsApi } from "../api/reviews.api";

// 1. Fetch Pending Reviews Hook
export function usePendingReviews() {
  return useQuery({
    queryKey: ["reviews", "pending"],
    queryFn: () => buyerOrdersApi.getPendingReviews(),
  });
}

// 2. Submit Review Hook
export function useSubmitReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => reviewsApi.submitReview(formData),
    onSuccess: () => {
      // Refresh pending reviews list to remove the one we just submitted
      queryClient.invalidateQueries({ queryKey: ["reviews", "pending"] });
      queryClient.invalidateQueries({ queryKey: ["reviews", "history"] });
    },
  });
}
