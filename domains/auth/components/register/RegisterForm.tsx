"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RiArrowRightLine } from "react-icons/ri";
import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import useRegisterSchema, {
  RegisterSchemaType,
} from "../../schemas/useRegisterSchema";
import useAuthRegister from "../../hooks/useAuthRegister";
import { toast } from "sonner";

// ── form ───────────────────────────────────────────────────
export default function RegisterForm() {
  const { mutateAsync: registerUser, isPending } = useAuthRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(useRegisterSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    toast.promise(registerUser(data), {
      loading: "Creating account...",
      success: () => {
        reset();
        return `Account created successfully!, please check your email to verify it.`;
      },
      error: (error) => error.response?.data.message,
    });
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Full Name */}
      <CustomInput
        type="text"
        name="name"
        label="Full Name"
        placeholder="John Doe"
        registerProps={register("name")}
        error={errors.name?.message}
      />

      {/* Email */}
      <CustomInput
        type="email"
        name="email"
        label="Email Address"
        placeholder="name@example.com"
        registerProps={register("email")}
        error={errors.email?.message}
      />

      {/* Password */}
      <CustomInput
        type="password"
        name="password"
        label="Password"
        placeholder="••••••••"
        registerProps={register("password")}
        error={errors.password?.message}
      />

      {/* Confirm Password */}
      <CustomInput
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        placeholder="••••••••"
        registerProps={register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      {/* Submit */}
      <CustomButton
        type="submit"
        className="mt-2"
        rightIcon={<RiArrowRightLine size={12} />}
        variant="solid"
        theme="primary"
        loading={isPending}
      >
        Create Account
      </CustomButton>
    </form>
  );
}
