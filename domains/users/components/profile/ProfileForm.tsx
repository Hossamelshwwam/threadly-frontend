"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RiCheckLine, RiCloseLine, RiMailLine } from "react-icons/ri";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomButton from "@/shared/components/custom-button/custom-button";
import {
  updateProfileSchema,
  type UpdateProfileInput,
} from "../../schemas/profile.schema";
import { useUpdateProfile } from "../../hooks/useUser";

export default function ProfileForm({ user, onCancel }: any) {
  const { mutateAsync: updateProfileAsync, isPending: isUpdating } =
    useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.data.name,
        phone: user.data.phone || "",
      });
    }
  }, [user, reset]);

  const onUpdateSubmit = async (data: UpdateProfileInput) => {
    toast.promise(updateProfileAsync(data), {
      loading: "Updating profile...",
      success: () => {
        onCancel(); // Close form on success
        return "Profile updated successfully!";
      },
      error: (err: any) =>
        err?.response?.data?.message || "Failed to update profile",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onUpdateSubmit)}
      className="space-y-6 animate-fadeIn"
    >
      <CustomInput
        name="name"
        type="text"
        label="Full Name"
        placeholder="e.g. John Doe"
        registerProps={register("name")}
        error={errors.name?.message}
      />

      <CustomInput
        name="phone"
        type="text"
        label="Phone Number"
        placeholder="+201..."
        registerProps={register("phone")}
        error={errors.phone?.message}
      />

      <div>
        <label className="block text-sm font-bold text-zinc-700 mb-1.5">
          Email Address
        </label>
        <div className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-500 text-sm font-medium cursor-not-allowed flex items-center gap-2">
          <RiMailLine /> {user.data.email}
        </div>
        <p className="text-xs text-zinc-400 mt-1.5">
          Email address cannot be changed directly.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-4">
        <CustomButton
          type="button"
          variant="outline"
          theme="neutral"
          onClick={() => {
            reset();
            onCancel();
          }}
          className="flex-1 rounded-xl font-bold"
          leftIcon={<RiCloseLine />}
        >
          Cancel
        </CustomButton>
        <CustomButton
          type="submit"
          variant="solid"
          theme="primary"
          disabled={isUpdating}
          className="flex-1 rounded-xl font-bold"
          leftIcon={<RiCheckLine />}
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </CustomButton>
      </div>
    </form>
  );
}
