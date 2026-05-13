import { useRouter } from "next/navigation";
import { authApi } from "../api/auth.api";
import { useMutation } from "@tanstack/react-query";

export default function useAuthResetPassword() {
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess() {
      router.push("/login");
    },
  });
}
