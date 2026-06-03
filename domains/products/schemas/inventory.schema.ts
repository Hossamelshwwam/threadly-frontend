import { z } from "zod";

export const createVariantSchema = z.object({
  sku: z.string().min(2, "SKU reference identifier is required"),
  size: z.string().min(1, "Size dimension is required"),
  color: z.string().min(1, "Color attribute is required"),
  stock: z.number().min(0, "Stock quantity cannot be negative"),
  price: z.number().min(0, "Price metric must be a positive number"),
});

export type CreateVariantInput = z.infer<typeof createVariantSchema>;

export const updateVariantSchema = createVariantSchema.partial();

export type UpdateVariantInput = z.infer<typeof updateVariantSchema>;

export const restockVariantSchema = z.object({
  quantity: z.number().min(1, "Restock increment value must be at least 1"),
});

export type RestockVariantInput = z.infer<typeof restockVariantSchema>;
