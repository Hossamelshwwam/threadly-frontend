import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";

export default function useAuthVerifyEmail(token?: string) {
  return useQuery({
    queryKey: ["verify-email", token],
    queryFn: () => authApi.verifyEmail(token!),
    enabled: !!token,
  });
}
