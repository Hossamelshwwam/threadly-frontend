import { z } from "zod";

export const checkoutSchema = z.object({
  paymentMethod: z.enum(["credit_card", "cash_on_delivery"], {
    error: "Please select a payment method",
  }),
  addressId: z.string().nonempty({ message: "Please select an address" }),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
