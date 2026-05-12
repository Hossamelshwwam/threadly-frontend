import { api } from "@/infrastructure/axios";
import type { LoginSchemaType } from "../schemas/useLoginSchema";
import type { RegisterSchemaType } from "../schemas/useRegisterSchema";
import { LoginResponseDto } from "../types";

export const authApi = {
  login: async (data: LoginSchemaType): Promise<LoginResponseDto> => {
    const res = await api.post("/auth/login", data);
    return res.data;
  },
  register: async (data: RegisterSchemaType) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },
};
