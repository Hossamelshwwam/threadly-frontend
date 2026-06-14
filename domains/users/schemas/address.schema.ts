import { z } from "zod";

export const addAddressSchema = z.object({
  label: z.string().min(1, "Label is required (e.g., Home)"),
  fullName: z.string().min(2, "Full name is required"),
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Governorate is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required").default("Egypt"),
  phonenumber: z.string().min(8, "Valid phone number is required"),
  isDefault: z.boolean(),
});

export type AddAddressInput = z.infer<typeof addAddressSchema>;
