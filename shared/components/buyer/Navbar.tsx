"use client";

import Link from "next/link";
import { useState } from "react";
import {
  RiSearchLine,
  RiShoppingBagLine,
  RiUserLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";
import useCart from "@/domains/cart/hooks/useCart";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <div>

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: '#d99a4a',
          borderBottom: '1px solid #c47f2e'
        }}
      >
        <div className="container mx-auto px-8 h-20 flex items-center justify-between gap-8">
          <Link href="/" className="text-2xl font-black tracking-tight text-white">
            THREADLY
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            {["New Arrivals", "Men", "Women", "Accessories"].map((item) => (
              <Link
                key={item}
                href="/products"
                className="text-sm font-medium tracking-wide text-white/75 hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              className="p-3 rounded-xl hover:bg-white/10 text-white/75 hover:text-white transition-colors"
            >
              <RiSearchLine size={20} />
            </button>
            <Link
              href="/login"
              aria-label="Sign in"
              className="p-3 rounded-xl hover:bg-white/10 text-white/75 hover:text-white transition-colors hidden sm:block"
            >
              <RiUserLine size={20} />
            </Link>
            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="p-3 rounded-xl hover:bg-white/10 text-white/75 hover:text-white transition-colors relative"
            >
              <RiShoppingBagLine size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-white text-amber-700 text-[10px] font-bold rounded-full">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-3 rounded-xl hover:bg-white/10 text-white/75 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <RiCloseLine size={20} /> : <RiMenuLine size={20} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 px-8 py-6 space-y-4 animate-in slide-in-from-top duration-200"
            style={{ background: '#d99a4a' }}
          >
            {["New Arrivals", "Men", "Women", "Accessories"].map((item) => (
              <Link
                key={item}
                href="/products"
                className="block text-sm font-medium text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <hr className="border-white/20" />
            <Link
              href="/login"
              className="flex items-center gap-3 text-sm font-medium text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <RiUserLine size={16} />
              Sign In
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-3 text-sm font-medium text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Account
            </Link>
          </div>
        )}
      </header>

    </div>
  );
}
