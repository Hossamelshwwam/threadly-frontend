"use client";

import React from "react";
import Link from "next/link";
import {
  RiUserLine,
  RiSettings3Line,
  RiFileList3Line,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { useGetMe } from "@/domains/users/hooks/useUser";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import CustomAvatar from "../custom-avatar/CustomAvatar";
import useLogout from "@/shared/hooks/useLogout";

export function AccountMenu() {
  const { data, isPending } = useGetMe();
  const { logout } = useLogout();

  const user = data;

  if (isPending) {
    return <div className="w-11 h-11 rounded-xl bg-white/10 animate-pulse" />;
  }

  // CASE 1: User is NOT authenticated -> Display original Sign In Button
  if (!user) {
    return (
      <Link
        href="/login"
        aria-label="Sign in"
        className="p-2 sm:p-3 rounded-xl hover:bg-white/10 text-white/75 hover:text-white transition-colors hidden sm:block"
      >
        <RiUserLine size={20} />
      </Link>
    );
  }

  // Extract initials for the avatar placeholder
  const initials = user.data.name
    ? user.data.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  // CASE 2: User IS authenticated -> Display Interactive Branded Dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button aria-label="User account menu">
          <CustomAvatar img={user.data.avatar} fallback={initials} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 mt-2 bg-white rounded-xl shadow-xl border border-zinc-100 p-1.5 z-70"
        align="end"
      >
        <DropdownMenuLabel className="px-3 py-2">
          <p className="text-sm font-black text-zinc-950 truncate">
            {user.data.name}
          </p>
          <p className="text-xs font-medium text-zinc-500 truncate mt-0.5">
            {user.data.email}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-zinc-100 my-1" />

        <DropdownMenuItem
          asChild
          className="focus:bg-zinc-50 rounded-lg cursor-pointer py-2.5 px-3"
        >
          <Link
            href="/account"
            className="flex items-center gap-2 text-zinc-700 font-bold text-sm"
          >
            <RiUserLine className="text-zinc-400" size={18} />
            My Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="focus:bg-zinc-50 rounded-lg cursor-pointer py-2.5 px-3"
        >
          <Link
            href="/account/orders"
            className="flex items-center gap-2 text-zinc-700 font-bold text-sm"
          >
            <RiFileList3Line className="text-zinc-400" size={18} />
            Order History
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="focus:bg-zinc-50 rounded-lg cursor-pointer py-2.5 px-3"
        >
          <Link
            href="/account/security"
            className="flex items-center gap-2 text-zinc-700 font-bold text-sm"
          >
            <RiSettings3Line className="text-zinc-400" size={18} />
            Account Security
          </Link>
        </DropdownMenuItem>

        {user.data.role !== "buyer" && (
          <DropdownMenuItem
            asChild
            className="focus:bg-zinc-50 rounded-lg cursor-pointer py-2.5 px-3"
          >
            <Link
              href={`/${user.data.role}`}
              className="flex items-center gap-2 text-zinc-700 font-bold text-sm capitalize"
            >
              <RiSettings3Line className="text-zinc-400" size={18} />
              {user.data.role} Dashboard
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="bg-zinc-100 my-1" />

        <DropdownMenuItem
          className="focus:bg-red-50 text-red-600 focus:text-red-700 rounded-lg cursor-pointer py-2.5 px-3 font-bold text-sm flex items-center gap-2"
          onClick={() => {
            logout();
          }}
        >
          <RiLogoutBoxRLine size={18} />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
