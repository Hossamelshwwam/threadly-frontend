import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z
    .string()
    .min(5, "Comment must be at least 5 characters")
    .max(2000, "Comment is too long"),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
