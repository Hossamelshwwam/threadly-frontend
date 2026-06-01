"use client";

import { usePathname } from "next/navigation";
import { adminNavItems } from "./nav-config";
import {
  RiBellLine,
  RiSearchLine,
  RiLogoutBoxLine,
  RiUserLine,
} from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

export function AdminHeader() {
  const pathname = usePathname();

  const currentPage = adminNavItems.find((item) => {
    if (item.href === "/admin") return pathname === "/admin";
    return pathname.startsWith(item.href);
  });

  const pageTitle = currentPage?.label ?? "Admin";

  return (
    <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-6 sticky top-0 z-30 font-sans">
      {/* Page title */}
      <div>
        <h1 className="text-lg font-bold text-zinc-900 leading-none">
          {pageTitle}
        </h1>
        <p className="text-xs font-normal text-zinc-400 mt-1">
          Threadly Admin Panel
        </p>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Search trigger */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-50 border border-zinc-200 text-sm text-zinc-400 hover:border-zinc-300 transition-colors cursor-pointer">
          <RiSearchLine className="text-base text-amber-500" />
          <span className="text-xs font-normal hidden sm:block text-zinc-500">
            Search...
          </span>
          <span className="hidden sm:flex items-center gap-0.5 text-[10px] font-medium text-zinc-300">
            <kbd className="px-1 py-0.5 rounded bg-zinc-100 border border-zinc-200">
              ⌘
            </kbd>
            <kbd className="px-1 py-0.5 rounded bg-zinc-100 border border-zinc-200">
              K
            </kbd>
          </span>
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-md bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 transition-colors cursor-pointer">
          <RiBellLine className="text-base" />
          {/* unread dot */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
        </button>

        {/* Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none border-none bg-transparent p-0 m-0 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-main border-2 border-main-warm flex items-center justify-center text-main-subtle text-sm font-bold hover:border-amber-400 transition-colors">
              A
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 font-sans bg-white border border-zinc-200 rounded-md p-1 shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-2"
          >
            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="h-px bg-zinc-100 my-1" />

            <button className="w-full flex items-center gap-2 px-2 py-2 text-sm font-medium group text-zinc-800 rounded-md hover:bg-zinc-50 hover:text-zinc-950 outline-none cursor-pointer transition-colors">
              <RiUserLine className="text-zinc-400 text-base group-hover:text-zinc-600" />
              Profile
            </button>

            <DropdownMenuSeparator className="h-px bg-zinc-100 my-1" />

            <button className="w-full flex items-center gap-2 px-2 py-2 text-sm font-semibold group text-error rounded-md hover:bg-error-bg! outline-none cursor-pointer transition-colors hover:text-error">
              <RiLogoutBoxLine className="text-error text-base group-hover:text-error" />
              Sign out
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
