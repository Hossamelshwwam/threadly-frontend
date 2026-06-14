"use client";

import React from "react";
import Image from "next/image";
import { CartItem } from "@/domains/cart/types/cart.types";
import { RiShoppingBagLine, RiLockPasswordLine } from "react-icons/ri";
import CustomButton from "@/shared/components/custom-button/custom-button";

interface Props {
  cartItems: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  isPending: boolean;
  onSubmit: () => void;
  disabled: boolean;
}

export function CheckoutOrderSummary({
  cartItems,
  subtotal,
  shippingFee,
  total,
  isPending,
  onSubmit,
  disabled,
}: Props) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden font-sans">
      <div className="p-6 border-b border-zinc-100">
        <h2 className="text-lg font-bold text-zinc-900">Order Summary</h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Items List */}
        <div className="space-y-4 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
          {cartItems.map((item, idx: number) => (
            <div key={idx} className="flex items-center gap-4 text-sm pt-2">
              <div className="relative">
                <div className="h-14 w-14 relative bg-zinc-50 rounded-lg border border-zinc-200 overflow-hidden shrink-0">
                  {item.productId.images?.[0] ? (
                    <Image
                      src={item.productId.images[0]}
                      alt={item.productId?.name || "Product"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <RiShoppingBagLine className="text-xl text-zinc-300" />
                    </div>
                  )}
                </div>
                {/* Brand-aligned dark badge for quantity */}
                <span className="absolute -top-2 -right-2 bg-main text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white">
                  {item.quantity}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-zinc-900 truncate">
                  {item.productId?.name}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {item.inventoryId?.size} / {item.inventoryId?.color}
                </p>
              </div>

              <div className="font-bold text-zinc-900 whitespace-nowrap">
                EGP {(item.priceSnapshot * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Totals Breakdown */}
        <div className="space-y-3 text-sm pt-4 border-t border-zinc-100">
          <div className="flex justify-between text-zinc-500 font-medium">
            <span>Subtotal</span>
            <span className="text-zinc-900">
              EGP {subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-zinc-500 font-medium">
            <span>Delivery</span>
            <span className="text-zinc-900">
              EGP {shippingFee.toLocaleString()}
            </span>
          </div>

          {/* On-brand Total Box using zinc & amber */}
          <div className="flex justify-between items-center bg-zinc-50 border border-zinc-200 text-zinc-900 px-4 py-3 rounded-xl mt-4 font-bold shadow-sm">
            <span>Total</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-zinc-500 font-medium">EGP</span>
              <span className="text-lg text-amber-600">
                {total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-zinc-400 text-center leading-relaxed">
          Delivery fee and taxes (if applicable) are calculated during checkout
        </p>

        {/* Replaced raw button with Design System CustomButton */}
        <CustomButton
          type="submit"
          variant="solid"
          theme="primary"
          fullWidth
          onClick={onSubmit}
          disabled={disabled}
        >
          {isPending ? "Processing..." : "Complete Purchase"}
        </CustomButton>

        <div className="flex items-center justify-center gap-1.5 pt-2 text-zinc-400">
          <RiLockPasswordLine size={12} />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Secure Encrypted Payment
          </span>
        </div>
      </div>
    </div>
  );
}
