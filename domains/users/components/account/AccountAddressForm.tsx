"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";

import { useAddAddress, useUpdateAddress } from "@/domains/users/hooks/useUser";
import {
  AddAddressInput,
  addAddressSchema,
} from "@/domains/users/schemas/address.schema";
import type { Address } from "@/domains/users/types/user.types";

import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomSelect from "@/shared/components/custom-select/CustomSelect";
import CustomButton from "@/shared/components/custom-button/custom-button";

interface Props {
  initialData?: Address | null;
  onClose: () => void;
}

export function AccountAddressForm({ initialData, onClose }: Props) {
  const { mutateAsync: addAddress, isPending: isAdding } = useAddAddress();
  const { mutateAsync: updateAddress, isPending: isUpdating } =
    useUpdateAddress();

  const isPending = isAdding || isUpdating;
  const isEditing = !!initialData;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AddAddressInput>({
    resolver: zodResolver(addAddressSchema),
    defaultValues: {
      isDefault: false,
      country: "Egypt",
    },
  });

  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      reset({
        label: initialData.label,
        street: initialData.street,
        city: initialData.city,
        state: initialData.state,
        postalCode: initialData.postalCode,
        country: initialData.country,
        phonenumber: initialData?.phonenumber || "",
        isDefault: initialData.isDefault,
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (data: AddAddressInput) => {
    const action = isEditing
      ? updateAddress({ id: initialData._id, payload: data })
      : addAddress(data);

    toast.promise(action, {
      loading: isEditing ? "Updating address..." : "Adding address...",
      success: () => {
        onClose();
        return isEditing
          ? "Address updated successfully!"
          : "Address added successfully!";
      },
      error: (error: any) =>
        error.response?.data?.message || "Operation failed!",
    });
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm animate-fadeIn mt-6">
      <h3 className="text-lg font-bold text-zinc-900 mb-4 border-b border-zinc-100 pb-4">
        {isEditing ? "Edit Address" : "Add New Address"}
      </h3>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <CustomSelect
          name="country"
          label="Country/Region"
          options={[{ label: "Egypt", value: "Egypt" }]}
          registerProps={register("country")}
          error={errors?.country?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInput
            name="label"
            type="text"
            label="Address Label"
            placeholder="e.g. Home, Office"
            registerProps={register("label")}
            error={errors.label?.message}
          />
        </div>

        <CustomInput
          name="street"
          type="text"
          label="Address"
          placeholder="Street address, apartment, suite, etc."
          registerProps={register("street")}
          error={errors.street?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CustomInput
            name="city"
            type="text"
            label="City"
            placeholder="City"
            half
            registerProps={register("city")}
            error={errors.city?.message}
          />
          <CustomInput
            name="state"
            type="text"
            label="Governorate"
            placeholder="State"
            half
            registerProps={register("state")}
            error={errors.state?.message}
          />
          <CustomInput
            name="postalCode"
            type="text"
            label="ZIP code"
            placeholder="Postal Code"
            half
            registerProps={register("postalCode")}
            error={errors.postalCode?.message}
          />
        </div>

        <CustomInput
          name="phonenumber"
          type="text"
          label="phonenumber"
          placeholder="Phone number"
          registerProps={register("phonenumber")}
          error={errors?.phonenumber?.message}
        />

        {!initialData?.isDefault && (
          <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 mt-2 cursor-pointer w-fit">
            <input
              type="checkbox"
              {...register("isDefault")}
              className="w-4 h-4 rounded border-zinc-300 accent-amber-500"
            />
            Set as default shipping address
          </label>
        )}

        <div className="flex items-center justify-end gap-3 pt-4">
          <CustomButton
            type="button"
            variant="outline"
            theme="neutral"
            onClick={onClose}
            leftIcon={<RiCloseLine />}
          >
            Cancel
          </CustomButton>
          <CustomButton
            type="submit"
            variant="solid"
            theme="primary"
            disabled={isPending}
            leftIcon={<RiCheckLine />}
          >
            {isPending ? "Saving..." : "Save Address"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
