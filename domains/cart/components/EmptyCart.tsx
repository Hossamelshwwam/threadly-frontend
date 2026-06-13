"use client";

import Link from "next/link";
import {
  RiShoppingBag3Line,
  RiArrowRightLine,
  RiTruckLine,
  RiShieldCheckLine,
  RiRefreshLine,
} from "react-icons/ri";

const features = [
  {
    icon: RiTruckLine,
    title: "Free Shipping",
    detail: "On orders over EGP 500",
  },
  {
    icon: RiShieldCheckLine,
    title: "Secure Checkout",
    detail: "256-bit SSL encrypted",
  },
  {
    icon: RiRefreshLine,
    title: "Easy Returns",
    detail: "30-day return policy",
  },
];

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center animate-in fade-in duration-300 ease-out">
      <div className="relative w-28 h-28 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6">
        <RiShoppingBag3Line size={44} className="text-zinc-300" />
      </div>

      <h2 className="text-2xl font-bold text-zinc-900 mb-2 text-balance">
        Your cart is empty
      </h2>
      <p className="text-zinc-500 mb-10 max-w-sm leading-relaxed text-pretty text-center">
        Time to fill it with something you love. Explore our collection and
        discover pieces that speak to you.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {features.map(({ icon: Icon, title, detail }) => (
          <div
            key={title}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-100 min-w-[180px]"
          >
            <div className="w-9 h-9 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shrink-0">
              <Icon size={16} className="text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-zinc-900 leading-tight">
                {title}
              </span>
              <span className="text-[11px] text-zinc-500 leading-snug">
                {detail}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/products"
        className="inline-flex items-center gap-2 h-12 px-8 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm rounded-lg transition-all duration-150 shadow-lg shadow-amber-500/25 hover:shadow-amber-600/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
      >
        Start Shopping
        <RiArrowRightLine size={18} />
      </Link>
    </div>
  );
}