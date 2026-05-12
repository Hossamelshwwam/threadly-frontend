import { authApi } from "@/domains/auth/api/auth.api";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useAuthLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess(data) {
      Cookies.set("accessToken", data.accessToken);
      Cookies.set("refreshToken", data.refreshToken);
      router.push("/");
    },
  });
}
