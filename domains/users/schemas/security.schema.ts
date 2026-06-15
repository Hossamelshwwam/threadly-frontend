import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match. Please try again.",
    path: ["confirmNewPassword"], // Targets the error directly to the confirm field
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
