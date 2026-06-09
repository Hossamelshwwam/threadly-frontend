import { useQuery } from "@tanstack/react-query";
import { sellerStoreApi } from "../api/seller-store.api";

export function useGetMyStore() {
  return useQuery({
    queryKey: ["my-store-profile"],
    queryFn: sellerStoreApi.getMyStore,
    retry: false,
  });
}
