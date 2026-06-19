import { authApi } from "@/domains/auth/api/auth.api";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

export default function useAuthLogin() {
  return useMutation({
    mutationFn: authApi.login,
    onSuccess(data) {
      Cookies.set("accessToken", data.data.accessToken);
      Cookies.set("refreshToken", data.data.refreshToken);
    },
  });
}
