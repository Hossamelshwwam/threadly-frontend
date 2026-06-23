"use client";

import Link from "next/link";
import { useState } from "react";
import {
  RiShoppingBagLine,
  RiMenuLine,
  RiUserLine,
  RiArrowRightUpLine,
  RiCustomerService2Line,
  RiGlobalLine,
} from "react-icons/ri";
import useCart from "@/domains/cart/hooks/useCart";
import { AccountMenu } from "./AccountMenu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const NAV_LINKS = [
  { label: "Home", href: "/", desc: "Return to the storefront" },
  {
    label: "Collections",
    href: "/products",
    desc: "Explore our latest arrivals",
  },
  { label: "Account", href: "/account", desc: "Manage your profile & orders" },
  { label: "Cart", href: "/cart", desc: "View your shopping bag" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 bg-main w-screen shadow-sm">
        <div className="container mx-auto px-4 sm:px-8 h-20 flex items-center justify-between relative">
          {/* LEFT: Menu Slider */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="p-2 sm:p-3 rounded-xl hover:bg-white/10 text-white/90 hover:text-white transition-all cursor-pointer"
                >
                  <RiMenuLine size={24} />
                </button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-full sm:w-[400px] p-0 z-[100] border-r border-zinc-200 bg-white flex flex-col font-sans overflow-hidden shadow-2xl"
              >
                {/* Clean, Light Header */}
                <SheetHeader className="px-8 py-6 border-b border-zinc-100 text-left shrink-0 bg-white">
                  <SheetTitle className="text-xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-sm">
                      T
                    </span>
                    THREADLY
                  </SheetTitle>
                </SheetHeader>

                {/* Primary Navigation Links */}
                <div className="flex-1 overflow-y-auto px-8 py-8 bg-white">
                  <div className="flex flex-col">
                    {NAV_LINKS.map(({ href, label, desc }, index) => (
                      <Link
                        key={label}
                        href={href}
                        className="group flex flex-col outline-none py-5 border-b border-zinc-100/60 last:border-0"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest mb-1.5 font-mono">
                          0{index + 1}
                        </span>
                        <div className="flex items-center justify-between text-zinc-800 group-hover:text-amber-600 transition-colors duration-300">
                          {/* Font significantly reduced to text-xl / text-2xl */}
                          <span className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight group-hover:translate-x-1.5 transition-transform duration-300">
                            {label}
                          </span>
                          <RiArrowRightUpLine
                            className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-amber-500"
                            size={24}
                          />
                        </div>
                        {/* Descriptions are now always softly visible, turning slightly darker on hover */}
                        <span className="text-xs font-medium text-zinc-400 mt-1 group-hover:text-zinc-500 transition-colors duration-300">
                          {desc}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Profile Navigation Safeguard */}
                  <Link
                    href="/account"
                    className="group flex items-center gap-3 text-sm font-bold text-zinc-600 hover:text-amber-600 transition-colors sm:hidden pt-8 mt-4 border-t border-zinc-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center group-hover:bg-amber-50 group-hover:border-amber-200 group-hover:text-amber-600 transition-colors">
                      <RiUserLine size={18} />
                    </div>
                    Account Settings
                  </Link>
                </div>

                {/* Soft Grey Footer */}
                <div className="p-8 border-t border-zinc-100 bg-zinc-50/80 shrink-0">
                  <p className="text-[10px] font-semibold text-zinc-400 mt-6 uppercase tracking-widest">
                    © 2026 Threadly Global
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* CENTER: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-black tracking-tight text-white hover:opacity-80 transition-opacity"
            >
              THREADLY
            </Link>
          </div>

          {/* RIGHT: Account Dropdown & Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            <AccountMenu />

            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="p-2 sm:p-3 rounded-xl hover:bg-white/10 text-white/90 hover:text-white transition-all cursor-pointer relative"
            >
              <RiShoppingBagLine size={24} />
              {itemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 flex items-center justify-center bg-white text-main text-[9px] font-black rounded-full shadow-md animate-in zoom-in">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
