import z from "zod";

const useRegisterSchema = z
  .object({
    name: z
      .string("Name is required")
      .min(3, "Name must be at least 3 characters"),
    email: z.email("Invalid email"),
    password: z
      .string("Password is required")
      .min(8, "At least 8 characters")
      .regex(/\d/, "Must contain at least one number"),
    confirmPassword: z.string("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof useRegisterSchema>;

export default useRegisterSchema;
