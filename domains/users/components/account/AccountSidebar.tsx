"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiUser3Line,
  RiLockPasswordLine,
  RiMapPinLine,
  RiFileList3Line,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { cn } from "@/shared/lib";

const NAV_LINKS = [
  {
    name: "Account Details",
    href: "/account",
    icon: RiUser3Line,
  },
  {
    name: "Change Password",
    href: "/account/security",
    icon: RiLockPasswordLine,
  },
  {
    name: "Shipping Addresses",
    href: "/account/addresses",
    icon: RiMapPinLine,
  },
  {
    name: "Order History",
    href: "/account/orders",
    icon: RiFileList3Line,
  },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    // Note: top-28 ensures it sticks just below your 80px fixed navbar
    <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm lg:sticky lg:top-28">
      <div className="mb-6 px-4 pt-2">
        <h2 className="text-xl font-black text-zinc-900 tracking-tight">
          My Account
        </h2>
        <p className="text-xs text-zinc-500 mt-1 font-medium">
          Manage your profile & orders
        </p>
      </div>

      <nav className="flex flex-col gap-1.5">
        <div className="pb-80">
          {NAV_LINKS.map((link) => {
            // Exact match for /account, otherwise startsWith for sub-routes
            const isActive =
              link.href === "/account"
                ? pathname === "/account"
                : pathname.startsWith(link.href);

            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                  isActive
                    ? "bg-zinc-900 text-white shadow-md"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
                )}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-amber-400" : "text-zinc-400"}
                />
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="my-2 border-t border-zinc-100"></div>

        {/* Logout Button */}
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all w-full text-left"
          onClick={() => {
            // TODO: Call your logout mutation/clear tokens here
          }}
        >
          <RiLogoutBoxRLine size={18} />
          Sign Out
        </button>
      </nav>
    </div>
  );
}
