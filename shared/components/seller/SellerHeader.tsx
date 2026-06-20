"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { sellerNavItems } from "./nav-config";
import {
  RiBellLine,
  RiLogoutBoxLine,
  RiStore2Line,
  RiMenuLine,
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
import { cn } from "@/shared/lib";
import { AccountMenu } from "../buyer/AccountMenu";

export function SellerHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentPage = sellerNavItems.find((item) => {
    if (item.href === "/seller") return pathname === "/seller";
    return pathname.startsWith(item.href);
  });

  const pageTitle = currentPage?.label ?? "Seller Dashboard";

  const { data, isLoading } = useGetMe();
  const user = data?.data;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 font-sans">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* FIX: Mobile Hamburger Menu (Hidden on Desktop) */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <button className="lg:hidden p-2 -ml-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors">
              <RiMenuLine size={24} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[280px] p-0 flex flex-col font-sans z-[100]"
          >
            <SheetHeader className="h-16 px-6 border-b border-zinc-200 flex flex-row items-center justify-start m-0 space-y-0">
              <SheetTitle className="flex items-center gap-2 m-0 mt-0">
                <div className="w-8 h-8 rounded bg-main flex items-center justify-center shadow-sm">
                  <span className="text-white font-black text-lg leading-none">
                    T
                  </span>
                </div>
                <span className="text-lg font-bold text-zinc-900 tracking-tight">
                  Vendor Hub
                </span>
              </SheetTitle>
            </SheetHeader>

            {/* Mobile Nav Links */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-4 px-2 mt-2">
                Store Management
              </div>
              {sellerNavItems.map((item) => {
                const isActive =
                  item.href === "/seller"
                    ? pathname === "/seller"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors outline-none",
                      isActive
                        ? "bg-amber-50 text-main font-bold"
                        : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "text-[18px]",
                        isActive ? "text-main" : "text-zinc-400",
                      )}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-zinc-900 leading-none">
            {pageTitle}
          </h1>
          {/* FIX: Hide the subtitle on very small mobile screens so it doesn't wrap awkwardly */}
          <p className="hidden sm:block text-xs font-normal text-zinc-400 mt-1">
            Manage your store & inventory
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 transition-colors cursor-pointer">
          <RiBellLine className="text-sm sm:text-base" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
        </button>

        <AccountMenu />
      </div>
    </header>
  );
}
