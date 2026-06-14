"use client";

import Link from "next/link";
import { RiShoppingBag3Line, RiArrowRightLine } from "react-icons/ri";

export function EmptyCart() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl bg-white border border-zinc-100 p-10 text-center shadow-sm">
      <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-zinc-50 border border-zinc-100">
        <RiShoppingBag3Line size={48} className="text-zinc-300" />
      </div>

      <h2 className="mb-4 text-3xl font-black text-zinc-950">
        Your cart is empty
      </h2>

      <p className="mb-10 max-w-md text-base font-medium text-zinc-500 leading-relaxed">
        Looks like you haven&apos;t added anything to your cart yet. Discover
        our latest arrivals and find something you love.
      </p>

      <Link
        href="/products"
        className="group flex h-14 items-center justify-center gap-3 rounded-2xl bg-amber-500 px-8 text-base font-black text-white shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-600 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
      >
        Start Shopping
        <RiArrowRightLine
          size={20}
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}
