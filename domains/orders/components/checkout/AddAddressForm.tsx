import { useAddAddress } from "@/domains/users/hooks/useUser";
import {
  AddAddressInput,
  addAddressSchema,
} from "@/domains/users/schemas/address.schema";
import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomSelect from "@/shared/components/custom-select/CustomSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";
import { toast } from "sonner";

export default function AddAddressForm({
  setShowAddressForm,
}: {
  setShowAddressForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(addAddressSchema),
    defaultValues: {
      isDefault: false,
    },
  });

  const { mutateAsync: addAddress, isPending } = useAddAddress();

  const onSubmit = async (data: AddAddressInput) => {
    toast.promise(addAddress(data), {
      loading: "Adding address...",
      success: () => {
        setShowAddressForm(false);
        return "Address added successfully!";
      },
      error: (error) => error.response.data.message || "Failed to add address!",
    });
  };

  return (
    <form
      className="space-y-4 animate-fadeIn"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 mt-2 cursor-pointer w-fit">
        <input
          type="checkbox"
          {...register("isDefault")}
          className="w-4 h-4 rounded border-zinc-300 accent-amber-500"
        />
        Save this as default address
      </label>
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
        label="Phone Number"
        placeholder="Phone number"
        registerProps={register("phonenumber")}
        error={errors?.phonenumber?.message}
      />

      {/* Form Action Buttons */}
      <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
        <CustomButton
          type="button"
          variant="outline"
          theme="neutral"
          onClick={() => setShowAddressForm(false)}
          className="flex-1"
          leftIcon={<RiCloseLine />}
        >
          Cancel
        </CustomButton>
        <CustomButton
          type="submit"
          variant="solid"
          theme="primary"
          disabled={isPending}
          className="flex-1"
          leftIcon={<RiCheckLine />}
        >
          {isPending ? "Saving..." : "Save Address"}
        </CustomButton>
      </div>
    </form>
  );
}
