"use client";

import { usePathname } from "next/navigation";
import { adminNavItems } from "./nav-config";
import { RiBellLine, RiSearchLine } from "react-icons/ri";

export function AdminHeader() {
  const pathname = usePathname();

  const currentPage = adminNavItems.find((item) => {
    if (item.href === "/admin") return pathname === "/admin";
    return pathname.startsWith(item.href);
  });

  const pageTitle = currentPage?.label ?? "Admin";

  return (
    <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Page title */}
      <div>
        <h1 className="text-lg font-700 text-zinc-900 leading-none">
          {pageTitle}
        </h1>
        <p className="text-xs font-400 text-zinc-400 mt-0.5">
          Threadly Admin Panel
        </p>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Search trigger */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-50 border border-zinc-200 text-sm text-zinc-400 hover:border-zinc-300 transition-colors">
          <RiSearchLine className="text-base" />
          <span className="text-xs hidden sm:block">Search...</span>
          <span className="hidden sm:flex items-center gap-0.5 text-[10px] font-500 text-zinc-300">
            <kbd className="px-1 py-0.5 rounded bg-zinc-100 border border-zinc-200">
              ⌘
            </kbd>
            <kbd className="px-1 py-0.5 rounded bg-zinc-100 border border-zinc-200">
              K
            </kbd>
          </span>
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-md bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 transition-colors">
          <RiBellLine className="text-base" />
          {/* unread dot */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-amber-100 border-2 border-amber-200 flex items-center justify-center text-amber-700 text-sm font-700 cursor-pointer hover:border-amber-300 transition-colors">
          A
        </div>
      </div>
    </header>
  );
}
