"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomTextarea from "@/shared/components/custom-textarea/CustomTextarea";

import { useUpdateStoreProfile } from "../../hooks/useUpdateStoreProfile";
import {
  useRegisterStoreSchema,
  type RegisterStoreSchemaType,
} from "../../schemas/useRegisterStoreSchema";

interface StoreProfileFormProps {
  store: any; // Replace with your Store type
  onCancel: () => void;
}

export function StoreProfileForm({ store, onCancel }: StoreProfileFormProps) {
  const { mutateAsync: updateProfile, isPending } = useUpdateStoreProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<RegisterStoreSchemaType>({
    resolver: zodResolver(useRegisterStoreSchema),
  });

  useEffect(() => {
    if (store) {
      reset({
        storeName: store.storeName || "",
        description: store.description || "",
        bankName: store.bankDetails?.bankName || "",
        accountName: store.bankDetails?.accountName || "",
        accountNumber: store.bankDetails?.accountNumber || "",
      });
    }
  }, [store, reset]);

  const onSubmit = (formData: RegisterStoreSchemaType) => {
    toast.promise(updateProfile(formData), {
      loading: "Saving changes...",
      success: () => {
        onCancel(); // Exit edit mode on success!
        return "Store profile updated successfully!";
      },
      error: "Failed to update profile. Please try again.",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-8"
    >
      <div className="border-b border-zinc-100 pb-4">
        <h3 className="text-lg font-bold text-zinc-900">Edit Profile</h3>
        <p className="text-xs text-zinc-500 mt-1">
          Update your store information.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-zinc-900">Basic Information</h3>
        <CustomInput
          label="Store Name"
          type="text"
          name="storeName"
          placeholder="Your store name"
          registerProps={register("storeName")}
          error={errors.storeName?.message}
        />
        <CustomTextarea
          label="Store Description"
          name="description"
          placeholder="What makes your products unique?"
          registerProps={register("description")}
          error={errors.description?.message}
        />
      </div>

      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-bold text-zinc-900">Payout Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInput
            label="Bank Name"
            type="text"
            name="bankName"
            placeholder="e.g. CIB, NBE"
            registerProps={register("bankName")}
            error={errors.bankName?.message}
          />
          <CustomInput
            label="Account Holder Name"
            type="text"
            name="accountName"
            placeholder="John Doe"
            registerProps={register("accountName")}
            error={errors.accountName?.message}
          />
          <div className="md:col-span-2">
            <CustomInput
              label="Account Number / IBAN"
              type="text"
              name="accountNumber"
              placeholder="EG1200..."
              registerProps={register("accountNumber")}
              error={errors.accountNumber?.message}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100">
        <CustomButton
          type="button"
          variant="outline"
          theme="neutral"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </CustomButton>
        <CustomButton
          type="submit"
          variant="solid"
          theme="primary"
          loading={isPending}
          disabled={!isDirty || isPending}
        >
          Save Changes
        </CustomButton>
      </div>
    </form>
  );
}
