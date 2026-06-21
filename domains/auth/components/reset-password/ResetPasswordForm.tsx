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
    watch,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(useResetPasswordSchema),
  });

  const password = watch("password", "");
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);

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

      <div className="flex flex-col gap-2">
        {[
          { pass: hasMinLength, label: "At least 8 characters" },
          { pass: hasNumber, label: "Contains at least one number" },
        ].map(({ pass, label }) => (
          <span
            key={label}
            className="flex items-center gap-2 text-sm transition-colors"
          >
            {pass ? (
              <RiCheckLine size={14} className="text-amber-500 shrink-0" />
            ) : (
              <RiCircleLine size={14} className="text-zinc-300 shrink-0" />
            )}
            <span className={pass ? "text-amber-600" : "text-zinc-500"}>
              {label}
            </span>
          </span>
        ))}
      </div>

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
