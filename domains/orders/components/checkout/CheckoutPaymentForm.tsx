// domains/orders/components/checkout/CheckoutPaymentForm.tsx
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
    <section className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b border-zinc-100 pb-4">
        <h2 className="text-lg font-bold text-zinc-900">Payment Method</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {/* COD Option */}
        <label
          onClick={() => setSelectMethod("cash_on_delivery")}
          className={cn(
            "min-w-[200px] h-[100px] p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between relative",
            selectMethod === "cash_on_delivery"
              ? "border-amber-400 bg-amber-50/30"
              : "border-zinc-200 hover:border-zinc-300 bg-white",
          )}
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-bold text-zinc-900">Cash on Delivery</span>
            <RiMoneyDollarCircleLine size={24} className="text-amber-500" />
          </div>
          <span className="text-xs font-medium text-zinc-500">
            Pay when you receive it
          </span>
          {selectMethod === "cash_on_delivery" && (
            <span className="absolute top-4 right-4 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-100" />
          )}
        </label>

        {/* Credit Card Option (Disabled Mock) */}
        <label className="min-w-[200px] h-[100px] p-4 rounded-xl border-2 border-zinc-200 bg-zinc-50 opacity-50 cursor-not-allowed flex flex-col justify-between">
          <div className="flex items-center justify-between w-full">
            <span className="font-bold text-zinc-900">Credit Card</span>
            <RiBankCardLine size={24} className="text-zinc-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500">Coming soon</span>
        </label>
      </div>
    </section>
  );
}
