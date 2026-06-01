"use client";

import React from "react";
import { RiSaveLine } from "react-icons/ri";
import {
  Path,
  PathValue,
  useFormContext,
  type FieldValues,
} from "react-hook-form";
import type { SellerProfile } from "@/domains/sellers/types/seller.types";
import CustomSelect from "@/shared/components/custom-select/CustomSelect";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { cn } from "@/shared/lib";

interface ProductPublishSidebarProps {
  sellers: SellerProfile[];
  isPending: boolean;
}

export function ProductPublishSidebar<T extends FieldValues>({
  sellers,
  isPending,
}: ProductPublishSidebarProps) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<T>();

  return (
    <div className="col-span-1 space-y-4 sticky top-22 font-sans">
      <div className="bg-white border border-zinc-200 rounded-lg p-5 space-y-4 shadow-xs">
        <h2 className="text-sm font-bold text-zinc-800 border-b border-zinc-100 pb-2">
          Ownership & Lifecycle
        </h2>

        <CustomSelect
          name="sellerId"
          label="Assigned Merchant Store"
          placeholder="Platform Direct (Threadly direct)"
          options={sellers.map((seller) => ({
            label: seller.storeName,
            value: seller._id,
          }))}
          error={errors.sellerId?.message as string}
          registerProps={register("sellerId" as Path<T>)}
        />

        <div className="flex flex-col">
          <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5">
            Initial Publish State
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["active", "draft", "archived"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() =>
                  setValue("status" as Path<T>, s as PathValue<T, Path<T>>)
                }
                className={cn(
                  `h-11 rounded font-semibold text-sm border capitalize transition-all cursor-pointer`,
                  "bg-zinc-50 border-zinc-200 text-zinc-400 hover:bg-zinc-100",
                  watch("status" as Path<T>) === s &&
                    s === "active" &&
                    "bg-success-bg border-success text-success",
                  watch("status" as Path<T>) === s &&
                    s === "draft" &&
                    "bg-warning-bg border-warning text-warning",
                  watch("status" as Path<T>) === s &&
                    s === "archived" &&
                    "bg-error-bg border-error text-error",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <CustomButton
        type="submit"
        variant="solid"
        theme="primary"
        fullWidth
        className="h-12 text-base"
        disabled={isPending}
        leftIcon={<RiSaveLine />}
      >
        {isPending ? "Creating Listing..." : "Save & Proceed"}
      </CustomButton>
    </div>
  );
}
