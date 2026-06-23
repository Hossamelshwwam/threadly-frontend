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
  RiChatHistoryLine,
  RiArrowLeftLine,
} from "react-icons/ri";
import { cn } from "@/shared/lib";
import useLogout from "@/shared/hooks/useLogout";
import { CiShop } from "react-icons/ci";
import { useGetMe } from "../../hooks/useUser";

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
  {
    name: "Pending Reviews",
    href: "/account/reviews/pending",
    icon: RiChatHistoryLine,
  },
];

export function AccountSidebar() {
  const pathname = usePathname();

  const { logout } = useLogout();

  const { data } = useGetMe();

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
        <div>
          <Link
            key={"Back To Home"}
            href={"/"}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",

              "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
            )}
          >
            <RiArrowLeftLine size={18} className={"text-zinc-400"} />
            Back To Home
          </Link>
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
                    ? "bg-amber-50"
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
          {data?.data.role === "buyer" && (
            <Link
              key={"Register As Seller"}
              href={"/seller"}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",

                "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
              )}
            >
              <CiShop size={18} className={"text-zinc-400"} />
              Register As Seller
            </Link>
          )}
        </div>

        <div className="my-2 border-t border-zinc-100"></div>

        {/* Logout Button */}
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all w-full text-left"
          onClick={logout}
        >
          <RiLogoutBoxRLine size={18} />
          Sign Out
        </button>
      </nav>
    </div>
  );
}
