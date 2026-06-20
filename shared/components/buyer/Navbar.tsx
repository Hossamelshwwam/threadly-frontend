"use client";

import Link from "next/link";
import { useState } from "react";
import { RiShoppingBagLine, RiMenuLine, RiUserLine } from "react-icons/ri";
import useCart from "@/domains/cart/hooks/useCart";
import { AccountMenu } from "./AccountMenu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 bg-main w-screen">
        <div className="container mx-auto px-4 sm:px-8 h-20 flex items-center justify-between relative">
          {/* LEFT: Menu Slider */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="p-2 sm:p-3 rounded-xl hover:bg-white/10 text-white/75 hover:text-white transition-colors"
                >
                  <RiMenuLine size={20} />
                </button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] p-0 z-[60]"
                style={{
                  background: "#d99a4a",
                  borderRight: "1px solid #c47f2e",
                }}
              >
                <SheetHeader className="p-6 border-b border-white/20 text-left">
                  <SheetTitle className="text-xl font-black tracking-tight text-white">
                    THREADLY
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col py-6 px-6 space-y-6">
                  {["New Arrivals", "Men", "Women", "Accessories"].map(
                    (item) => (
                      <Link
                        key={item}
                        href="/products"
                        className="text-lg font-medium tracking-wide text-white/80 hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item}
                      </Link>
                    ),
                  )}

                  <hr className="border-white/20" />

                  {/* Mobile Profile Navigation Safeguard */}
                  <Link
                    href="/account"
                    className="flex items-center gap-3 text-base font-medium text-white/80 hover:text-white transition-colors sm:hidden"
                    onClick={() => setIsOpen(false)}
                  >
                    <RiUserLine size={20} />
                    Account Settings
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* CENTER: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-black tracking-tight text-white"
            >
              THREADLY
            </Link>
          </div>

          {/* RIGHT: Account Dropdown & Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* INJECTED COMPONENT */}
            <AccountMenu />

            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="p-2 sm:p-3 rounded-xl hover:bg-white/10 text-white/75 hover:text-white transition-colors relative"
            >
              <RiShoppingBagLine size={25} />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-white text-amber-700 text-[10px] font-bold rounded-full">
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
