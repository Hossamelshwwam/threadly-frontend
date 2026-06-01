import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().min(10).max(5000),
  categoryId: z.string().min(1, "Category is required"),
  sellerId: z.string().optional(),
  basePrice: z.number().min(0, "Base price must be a positive number"),
  status: z.enum(["draft", "active", "archived"]).nonoptional(),
  attributes: z
    .array(z.object({ key: z.string().min(1), value: z.string().min(1) }))
    .optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.partial();

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
