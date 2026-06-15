"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RiLockPasswordLine, RiShieldKeyholeLine } from "react-icons/ri";

import { useChangePassword } from "@/domains/users/hooks/useUser";
import {
  changePasswordSchema,
  type ChangePasswordInput,
} from "@/domains/users/schemas/security.schema";

import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomButton from "@/shared/components/custom-button/custom-button";

export default function AccountSecurityPage() {
  const { mutateAsync: changePasswordAsync, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onSubmit", // Perf: Only validate on submit to prevent aggressive re-renders while typing
  });

  const onSubmit = async (data: ChangePasswordInput) => {
    // Strip confirmNewPassword as the API doesn't need it
    const payload = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    toast.promise(changePasswordAsync(payload), {
      loading: "Securing your new password...",
      success: () => {
        reset(); // Memory safety: Clear inputs immediately
        return "Password successfully updated!";
      },
      error: (err: any) =>
        err?.response?.data?.message ||
        "Failed to update password. Please verify your current password.",
    });
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm font-sans animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 border-b border-zinc-100 pb-6">
        <div className="h-12 w-12 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
          <RiShieldKeyholeLine className="text-2xl text-zinc-900" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
            Security Settings
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>
      </div>

      {/* Performant Uncontrolled Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-5">
        <CustomInput
          name="currentPassword"
          type="password"
          label="Current Password"
          placeholder="Enter your current password"
          registerProps={register("currentPassword")}
          error={errors.currentPassword?.message}
        />

        <div className="pt-2 border-t border-zinc-50">
          <CustomInput
            name="newPassword"
            type="password"
            label="New Password"
            placeholder="Minimum 8 characters"
            registerProps={register("newPassword")}
            error={errors.newPassword?.message}
          />
        </div>

        <CustomInput
          name="confirmNewPassword"
          type="password"
          label="Confirm New Password"
          placeholder="Repeat new password"
          registerProps={register("confirmNewPassword")}
          error={errors.confirmNewPassword?.message}
        />

        <div className="pt-4">
          <CustomButton
            type="submit"
            variant="solid"
            theme="primary"
            disabled={isPending}
            className="w-full sm:w-auto min-w-[200px] h-12 rounded-xl font-bold shadow-md"
            leftIcon={<RiLockPasswordLine />}
          >
            {isPending ? "Updating..." : "Update Password"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
