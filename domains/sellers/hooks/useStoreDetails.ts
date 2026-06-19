import { useQuery } from "@tanstack/react-query";
import { sellerStoreApi } from "../api/seller-store.api";

export function useStoreDetails(slug: string) {
  return useQuery({
    queryKey: ["store", slug],
    queryFn: () => sellerStoreApi.getStoreDetails(slug),
    enabled: !!slug,
  });
}
