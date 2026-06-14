"use client";

import { usePathname, useRouter } from "next/navigation";
import { sellerNavItems } from "./nav-config";
import { RiBellLine, RiLogoutBoxLine, RiStore2Line } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useGetMe } from "@/domains/users/hooks/useUser";
import CustomAvatar from "../custom-avatar/CustomAvatar";

export function SellerHeader() {
  const pathname = usePathname();
  const router = useRouter();

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
    <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-6 sticky top-0 z-30 font-sans">
      <div>
        <h1 className="text-lg font-bold text-zinc-900 leading-none">
          {pageTitle}
        </h1>
        <p className="text-xs font-normal text-zinc-400 mt-1">
          Manage your store & inventory
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-md bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 transition-colors cursor-pointer">
          <RiBellLine className="text-base" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none border-none bg-transparent p-0 m-0 cursor-pointer">
            <CustomAvatar
              fallback={user?.name.charAt(0).toUpperCase()}
              img={user?.avatar}
              loading={isLoading}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 font-sans bg-white border border-zinc-200 rounded-md p-1 shadow-md"
          >
            <DropdownMenuLabel className="px-3 py-2.5 flex flex-col gap-1">
              <span className="text-sm font-bold text-zinc-900 truncate leading-none">
                {user?.name || "Vendor Account"}
              </span>
              <span className="text-xs font-medium text-zinc-400 truncate">
                {user?.email || "seller@threadly.com"}
              </span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="h-px bg-zinc-100 my-1" />

            <button
              onClick={() => router.push("/seller/profile")}
              className="w-full flex items-center gap-2 px-2 py-2 text-sm font-medium group text-zinc-800 rounded-md hover:bg-zinc-50 hover:text-zinc-950 outline-none cursor-pointer transition-colors"
            >
              <RiStore2Line className="text-zinc-400 text-base group-hover:text-zinc-600" />
              Store Settings
            </button>

            <DropdownMenuSeparator className="h-px bg-zinc-100 my-1" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-2 py-2 text-sm font-semibold group text-error rounded-md hover:bg-error-bg! outline-none cursor-pointer transition-colors hover:text-error"
            >
              <RiLogoutBoxLine className="text-error text-base group-hover:text-error" />
              Sign out
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
