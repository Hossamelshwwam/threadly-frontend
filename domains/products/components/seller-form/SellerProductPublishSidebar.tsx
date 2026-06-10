// domains/products/components/seller-form/SellerProductPublishSidebar.tsx
"use client";

import React from "react";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import { RiSave3Line } from "react-icons/ri";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { cn } from "@/shared/lib";

interface Props {
  isPending: boolean;
  submitLabel?: string;
}

export function SellerProductPublishSidebar<T extends FieldValues>({
  isPending,
  submitLabel = "Save Product",
}: Props) {
  const { setValue, watch } = useFormContext<T>();
  const currentStatus = watch("status" as Path<T>);

  const statuses = [
    {
      value: "active",
      label: "Active",
      desc: "Visible to buyers instantly",
      color: "success",
    },
    {
      value: "draft",
      label: "Draft",
      desc: "Hidden, work in progress",
      color: "warning",
    },
    {
      value: "archived",
      label: "Archived",
      desc: "Hidden, discontinued",
      color: "error",
    },
  ] as const;

  return (
    <div className="col-span-1 space-y-6 sticky top-6 font-sans">
      <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-sm font-bold text-zinc-900 mb-4 border-b border-zinc-100 pb-3">
          Listing Visibility
        </h2>

        <div className="space-y-3">
          {statuses.map((s) => (
            <div
              key={s.value}
              onClick={() =>
                setValue("status" as Path<T>, s.value as PathValue<T, Path<T>>)
              }
              className={cn(
                "border rounded-xl p-3 cursor-pointer transition-all flex flex-col gap-0.5 relative overflow-hidden",
                currentStatus === s.value
                  ? `border-${s.color} bg-${s.color}-bg/30`
                  : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100/50",
              )}
            >
              {/* Active indicator dot */}
              <div
                className={cn(
                  "absolute top-4 right-4 w-2 h-2 rounded-full",
                  currentStatus === s.value ? `bg-${s.color}` : "bg-zinc-300",
                )}
              />

              <span
                className={cn(
                  "text-sm font-bold capitalize",
                  currentStatus === s.value
                    ? `text-${s.color}`
                    : "text-zinc-600",
                )}
              >
                {s.label}
              </span>
              <span className="text-xs text-zinc-500">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <CustomButton
        type="submit"
        variant="solid"
        theme="primary"
        fullWidth
        className="h-14 text-base rounded-xl shadow-md hover:shadow-lg transition-all"
        disabled={isPending}
        leftIcon={<RiSave3Line className="text-xl" />}
      >
        {isPending ? "Processing..." : submitLabel}
      </CustomButton>
    </div>
  );
}
