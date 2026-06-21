"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { adminNavItems } from "./nav-config";
import {
  RiBellLine,
  RiSearchLine,
  RiLogoutBoxLine,
  RiUserLine,
  RiMenuLine,
  RiThreadsLine,
} from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { useGetMe } from "@/domains/users/hooks/useUser";
import CustomAvatar from "../custom-avatar/CustomAvatar";
import useLogout from "@/shared/hooks/useLogout";
import { cn } from "@/shared/lib";
import { AccountMenu } from "../buyer/AccountMenu";

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentPage = adminNavItems.find((item) => {
    if (item.href === "/admin") return pathname === "/admin";
    return pathname.startsWith(item.href);
  });

  const pageTitle = currentPage?.label ?? "Admin";

  const { data, isLoading } = useGetMe();
  const user = data?.data;

  const { logout } = useLogout();

  return (
    <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 font-sans">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* FIX: Mobile Hamburger Menu (Hidden on Desktop) */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <button className="lg:hidden p-2 -ml-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer">
              <RiMenuLine size={24} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[280px] p-0 flex flex-col font-sans z-[100]"
          >
            <SheetHeader className="h-16 px-6 border-b border-zinc-200 flex flex-row items-center justify-start m-0 space-y-0">
              <SheetTitle className="flex items-center gap-2.5 m-0 mt-0">
                <div className="w-7 h-7 rounded-md bg-main flex items-center justify-center">
                  <RiThreadsLine className="text-white text-base" />
                </div>
                <div className="flex flex-col leading-none text-left">
                  <span className="text-sm font-black tracking-tight text-zinc-950">
                    Threadly
                  </span>
                  <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest mt-0.5">
                    Admin
                  </span>
                </div>
              </SheetTitle>
            </SheetHeader>

            {/* Mobile Nav Links */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2 px-3">
                Management
              </div>
              {adminNavItems.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors outline-none",
                      isActive
                        ? "bg-amber-50 text-amber-700"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "text-[18px]",
                        isActive ? "text-amber-500" : "text-zinc-400",
                      )}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="px-3 py-4 border-t border-zinc-100">
              <button
                onClick={logout}
                className="flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium text-zinc-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150 w-full group cursor-pointer"
              >
                <RiLogoutBoxLine className="text-base text-zinc-400 group-hover:text-red-500 transition-colors" />
                Sign out
              </button>
            </div>
          </SheetContent>
        </Sheet>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-zinc-900 leading-none">
            {pageTitle}
          </h1>
          <p className="hidden sm:block text-xs font-normal text-zinc-400 mt-1">
            Threadly Admin Panel
          </p>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Avatar Dropdown */}
        <AccountMenu />
      </div>
    </header>
  );
}
