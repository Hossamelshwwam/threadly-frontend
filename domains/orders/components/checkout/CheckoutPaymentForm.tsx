"use client";

import React from "react";
import { cn } from "@/shared/lib";
import { RiMoneyDollarCircleLine, RiBankCardLine } from "react-icons/ri";

interface Props {
  selectMethod: string;
  setSelectMethod: React.Dispatch<
    React.SetStateAction<"credit_card" | "cash_on_delivery">
  >;
}

export function CheckoutPaymentForm({ selectMethod, setSelectMethod }: Props) {
  return (
    <section className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b border-zinc-100 pb-4">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
          Payment Method
        </h2>
      </div>

      {/* Changed from overflow-x-auto to a responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* COD Option */}
        <label
          onClick={() => setSelectMethod("cash_on_delivery")}
          className={cn(
            "relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all w-full",
            selectMethod === "cash_on_delivery"
              ? "border-amber-400 bg-amber-50/50"
              : "border-zinc-200 hover:border-zinc-300 bg-white",
          )}
        >
          <div className="flex items-start justify-between w-full mb-1">
            <div className="flex items-center gap-2.5">
              <RiMoneyDollarCircleLine
                size={22}
                className={
                  selectMethod === "cash_on_delivery"
                    ? "text-amber-500"
                    : "text-zinc-400"
                }
              />
              <span className="font-bold text-zinc-900 text-sm sm:text-base">
                Cash on Delivery
              </span>
            </div>

            {/* Proper Radio Button Indicator */}
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                selectMethod === "cash_on_delivery"
                  ? "border-amber-500"
                  : "border-zinc-300",
              )}
            >
              {selectMethod === "cash_on_delivery" && (
                <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
              )}
            </div>
          </div>

          <span className="text-xs sm:text-sm font-medium text-zinc-500 ml-8">
            Pay when you receive it
          </span>
        </label>

        {/* Credit Card Option (Disabled Mock) */}
        <label className="relative flex flex-col p-4 rounded-xl border-2 border-zinc-200 bg-zinc-50 opacity-60 cursor-not-allowed w-full">
          <div className="flex items-start justify-between w-full mb-1">
            <div className="flex items-center gap-2.5">
              <RiBankCardLine size={22} className="text-zinc-400" />
              <span className="font-bold text-zinc-900 text-sm sm:text-base">
                Credit Card
              </span>
            </div>

            {/* Disabled Radio Indicator */}
            <div className="w-5 h-5 rounded-full border-2 border-zinc-200 bg-zinc-100 flex items-center justify-center shrink-0" />
          </div>

          <span className="text-xs sm:text-sm font-medium text-zinc-500 ml-8">
            Coming soon
          </span>
        </label>
      </div>
    </section>
  );
}
