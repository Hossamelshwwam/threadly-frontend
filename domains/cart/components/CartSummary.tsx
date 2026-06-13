"use client";

import Link from "next/link";
import {
  RiArrowRightLine,
  RiTruckLine,
  RiShieldCheckLine,
  RiCoupon3Line,
  RiShoppingBag3Line,
  RiCheckLine,
} from "react-icons/ri";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  itemCount: number;
  disabled?: boolean;
}

export function CartSummary({
  subtotal,
  shipping,
  itemCount,
  disabled = false,
}: CartSummaryProps) {
  const total = subtotal + shipping;
  const freeShippingThreshold = 500;
  const amountToFreeShipping = freeShippingThreshold - subtotal;
  const reachedFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-bold text-zinc-900 mb-5">Order Summary</h2>

        {/* Progress toward free shipping */}
        {!reachedFreeShipping && (
          <div className="bg-amber-50 rounded-xl p-4 mb-5">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="flex items-center gap-1.5 text-amber-700 font-medium">
                <RiTruckLine size={16} />
                Add EGP {amountToFreeShipping.toLocaleString()} for free shipping
              </span>
            </div>
            <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {reachedFreeShipping && (
          <div className="bg-emerald-50 rounded-xl p-4 mb-5 flex items-center gap-2 text-sm font-medium text-emerald-700">
            <RiCheckLine size={16} />
            You&apos;ve unlocked free shipping!
          </div>
        )}

        {/* Line items */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
            <span className="font-semibold text-zinc-800">
              EGP {subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Shipping</span>
            <span className={`font-semibold ${reachedFreeShipping ? "text-emerald-600" : "text-zinc-800"}`}>
              {reachedFreeShipping
                ? "Free"
                : shipping > 0
                ? `EGP ${shipping.toLocaleString()}`
                : "Calculated at checkout"}
            </span>
          </div>

          {/* Discount placeholder */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">Discount</span>
            <span className="font-semibold text-zinc-400">—</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-dashed border-zinc-100 my-4" />

        {/* Total */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-base font-bold text-zinc-900">Total</span>
          <span className="text-2xl font-black text-amber-600">
            EGP {total.toLocaleString()}
          </span>
        </div>

        {/* Checkout CTA */}
        <Link
          href="/checkout"
          className={`block w-full text-center py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            disabled
              ? "bg-zinc-100 text-zinc-400 cursor-not-allowed pointer-events-none"
              : "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-600/30 active:scale-[0.98]"
          }`}
        >
          Proceed to Checkout
          <RiArrowRightLine size={18} />
        </Link>

        <Link
          href="/products"
          className="block text-center mt-3 text-sm font-medium text-zinc-500 hover:text-amber-600 transition-colors py-2"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Footer trust badges */}
      <div className="border-t border-zinc-100 bg-zinc-50 px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-zinc-500 justify-center mb-2">
          <RiShieldCheckLine size={14} className="text-emerald-500" />
          <span>Secure 256-bit SSL encryption</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 justify-center">
          <RiCoupon3Line size={14} className="text-amber-500" />
          <span>Discounts applied at checkout</span>
        </div>
      </div>
    </div>
  );
}