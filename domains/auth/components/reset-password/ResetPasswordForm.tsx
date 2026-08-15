"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  RiLockLine,
  RiCheckLine,
  RiArrowRightLine,
  RiCircleLine,
} from "react-icons/ri";
import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import useAuthResetPassword from "../../hooks/useAuthResetPassword";
import useResetPasswordSchema, {
  ResetPasswordSchemaType,
} from "../../schemas/useResetPasswordSchema";

export function ResetPasswordForm({ token }: { token: string }) {
  const { mutateAsync: resetPassword, isPending } = useAuthResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(useResetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordSchemaType) => {
    toast.promise(resetPassword({ token, password: data.password }), {
      loading: "Resetting password...",
      success: "Password reset! You can now log in.",
      error: (err) => err.response?.data?.message ?? "Something went wrong.",
    });
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        name="password"
        type="password"
        label="New Password"
        placeholder="Min. 8 characters"
        Icon={RiLockLine}
        registerProps={register("password")}
        error={errors.password?.message}
      />

      <CustomInput
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Repeat new password"
        Icon={RiLockLine}
        registerProps={register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <CustomButton
        type="submit"
        variant="solid"
        theme="primary"
        className="w-full mt-2"
        loading={isPending}
        rightIcon={<RiArrowRightLine size={12} />}
      >
        Reset Password
      </CustomButton>
    </form>
  );
}
