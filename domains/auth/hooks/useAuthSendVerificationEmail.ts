import { authApi } from "../api/auth.api";
import { useMutation } from "@tanstack/react-query";

export default function useAuthSendVerificationEmail() {
  return useMutation({
    mutationFn: authApi.sendVerificationEmailAgain,
  });
}
