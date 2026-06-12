"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { RiMailLine, RiArrowRightLine } from "react-icons/ri";
import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import useAuthForgotPassword from "../../hooks/useAuthForgotPassword";
import useForgotPasswordSchema, {
  ForgotPasswordSchemaType,
} from "../../schemas/useForgotPasswordSchema";

export function ForgotPasswordForm() {
  const { mutateAsync: forgotPassword, isPending } = useAuthForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(useForgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordSchemaType) => {
    toast.promise(
      forgotPassword(data.email).then(() => reset()),
      {
        loading: "Sending reset link...",
        success: "Reset link sent! Check your inbox.",
        error: (err) => err.response?.data?.message ?? "Something went wrong.",
      },
    );
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CustomInput
        name="email"
        type="email"
        label="Email Address"
        placeholder="name@example.com"
        Icon={RiMailLine}
        registerProps={register("email")}
        error={errors.email?.message}
      />

      <CustomButton
        type="submit"
        variant="solid"
        theme="primary"
        className="w-full mt-2"
        loading={isPending}
        rightIcon={<RiArrowRightLine size={12} />}
      >
        Send Reset Link
      </CustomButton>
    </form>
  );
}
