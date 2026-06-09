"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "sonner";

import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomTextarea from "@/shared/components/custom-textarea/CustomTextarea";
import { useRegisterStore } from "../../hooks/useRegisterStore";
import {
  RegisterStoreSchemaType,
  useRegisterStoreSchema,
} from "../../schemas/useRegisterStoreSchema";

export default function StoreRegistrationForm() {
  const router = useRouter();
  const { mutateAsync: registerStore, isPending } = useRegisterStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterStoreSchemaType>({
    resolver: zodResolver(useRegisterStoreSchema),
  });

  const onSubmit = (data: RegisterStoreSchemaType) => {
    // Exact pattern you use for Login!
    toast.promise(registerStore(data), {
      loading: "Creating your store...",
      success: (response) => {
        // Push the user to their new dashboard upon successful creation
        router.push("/seller");
        // We safely assume the API returns the store profile in response.data
        return `Congratulations! ${response.data.storeName} is now live!`;
      },
      error: (error) =>
        error.response?.data?.message ||
        "Failed to create store. Please try again.",
    });
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Basic Store Info */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-200 pb-2">
          Store Details
        </h3>

        <CustomInput
          type="text"
          placeholder="e.g. Vintage Threads"
          name="storeName"
          label="Store Name *"
          registerProps={register("storeName")}
          error={errors.storeName?.message}
        />

        <CustomTextarea
          placeholder="Tell customers what makes your products unique..."
          name="description"
          label="Store Description (Optional)"
          registerProps={register("description")}
          error={errors.description?.message}
        />
      </div>

      {/* Financial Details */}
      <div className="space-y-4 mt-2">
        <div className="border-b border-zinc-200 pb-2">
          <h3 className="text-sm font-bold text-zinc-900">
            Bank Details for Payouts
          </h3>
          <p className="text-xs text-zinc-500">
            You can add this later from your store settings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CustomInput
            type="text"
            placeholder="e.g. CIB, NBE"
            name="bankName"
            label="Bank Name"
            registerProps={register("bankName")}
            error={errors.bankName?.message}
          />

          <CustomInput
            type="text"
            placeholder="Account holder name"
            name="accountName"
            label="Account Name"
            registerProps={register("accountName")}
            error={errors.accountName?.message}
          />

          <div className="sm:col-span-2">
            <CustomInput
              type="text"
              placeholder="EG120000000000000000000000"
              name="accountNumber"
              label="IBAN / Account Number"
              registerProps={register("accountNumber")}
              error={errors.accountNumber?.message}
            />
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <CustomButton
        type="submit"
        className="mt-4"
        rightIcon={<FaArrowRight size={10} />}
        variant="solid"
        theme="primary"
        loading={isPending}
        fullWidth
      >
        Open My Store
      </CustomButton>
    </form>
  );
}
