"use client";

import Link from "next/link";
import {
  RiArrowRightLine,
  RiLockPasswordLine,
  RiVerifiedBadgeLine,
} from "react-icons/ri";

interface CartSummaryProps {
  subtotal: number;
  itemCount: number;
  disabled?: boolean;
}

export function CartSummary({
  subtotal,
  itemCount,
  disabled = false,
}: CartSummaryProps) {
  // Since shipping and discounts are removed, total is just subtotal
  const total = subtotal;

  return (
    <div className="flex flex-col rounded-3xl bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100">
      <h2 className="mb-8 text-xl font-black text-zinc-950">Order Summary</h2>

      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between text-zinc-600">
          <span className="font-medium">
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
          <span className="font-bold">EGP {subtotal.toLocaleString()}</span>
        </div>

        {/* Clean Divider */}
        <div className="h-px w-full bg-zinc-100 my-2" />

        <div className="flex items-end justify-between">
          <span className="text-lg font-black text-zinc-900">Total</span>
          <span className="text-3xl font-black text-amber-500">
            EGP {total.toLocaleString()}
          </span>
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 text-right">
          Taxes Included
        </p>
      </div>

      <Link
        href="/checkout"
        className={`group flex h-16 w-full items-center justify-center gap-3 rounded-2xl px-6 text-lg font-black transition-all ${
          disabled
            ? "bg-zinc-100 text-zinc-400 pointer-events-none"
            : "bg-amber-500 text-white shadow-lg shadow-amber-500/25 hover:bg-amber-600 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
        }`}
      >
        Secure Checkout
        <RiArrowRightLine
          size={22}
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>

      {/* Trust Badges */}
      <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-zinc-50 p-5 border border-zinc-100">
        <div className="flex items-center gap-3 text-sm font-bold text-zinc-600">
          <RiLockPasswordLine size={18} className="text-amber-500" />
          Secure 256-bit SSL encryption
        </div>
        <div className="flex items-center gap-3 text-sm font-bold text-zinc-600">
          <RiVerifiedBadgeLine size={18} className="text-amber-500" />
          Quality guarantee on all items
        </div>
      </div>
    </div>
  );
}
