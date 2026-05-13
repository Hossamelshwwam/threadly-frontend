import { api } from "@/infrastructure/axios";
import type { LoginSchemaType } from "../schemas/useLoginSchema";
import type { RegisterSchemaType } from "../schemas/useRegisterSchema";
import type { LoginResponseDto } from "../types";

export const authApi = {
  login: async (data: LoginSchemaType) => {
    const res = await api.post("/auth/login", data);
    return res.data as {
      data: LoginResponseDto;
      message: string;
      success: boolean;
    };
  },
  register: async (data: RegisterSchemaType) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },
  verifyEmail: async (token: string) => {
    const res = await api.get(`/auth/verify-email/${token}`);
    return res.data;
  },
  sendVerificationEmailAgain: async (email: string) => {
    const res = await api.post("/auth/send-verification-email", { email });
    return res.data;
  },
  forgotPassword: async (email: string) => {
    const res = await api.post("/auth/forgot-password", { email });
    return res.data;
  },
  resetPassword: async (data: { token: string; password: string }) => {
    const res = await api.post("/auth/reset-password", data);
    return res.data;
  },
};
