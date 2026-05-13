import { authApi } from "../api/auth.api";
import { useMutation } from "@tanstack/react-query";

export default function useAuthRegister() {
  return useMutation({
    mutationFn: authApi.register,
  });
}
