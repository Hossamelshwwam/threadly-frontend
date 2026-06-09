import { z } from "zod";

export const useRegisterStoreSchema = z.object({
  storeName: z.string().min(3, "Store name must be at least 3 characters"),
  description: z.string().optional(),
  bankName: z.string().min(2, "Bank name is required"),
  accountName: z.string().min(2, "Account holder name is required"),
  accountNumber: z.string().min(10, "Valid IBAN/Account Number is required"),
});

export type RegisterStoreSchemaType = z.infer<typeof useRegisterStoreSchema>;
