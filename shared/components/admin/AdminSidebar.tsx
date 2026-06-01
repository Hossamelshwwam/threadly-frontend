"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "./nav-config";
import { RiThreadsLine, RiLogoutBoxLine } from "react-icons/ri";
import { cn } from "@/shared/lib";

interface AdminSidebarProps {
  pendingSellers?: number;
  pendingPayouts?: number;
}

export function AdminSidebar({
  pendingSellers = 0,
  pendingPayouts = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const getBadgeCount = (badge?: string) => {
    if (badge === "pending_sellers") return pendingSellers;
    if (badge === "pending_payouts") return pendingPayouts;
    return 0;
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-zinc-200 flex flex-col z-40">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 h-16 border-b border-zinc-200 shrink-0">
        <div className="w-7 h-7 rounded-md bg-main flex items-center justify-center">
          <RiThreadsLine className="text-white text-base" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-black tracking-tight text-zinc-950">
            Threadly
          </span>
          <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">
            Admin
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest px-3 mb-2">
          Management
        </p>
        {adminNavItems.map((item) => {
          const active = isActive(item.href);
          const badgeCount = getBadgeCount(item.badge);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 group relative",
                active
                  ? "bg-amber-50 text-amber-700"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
              )}
            >
              {/* Active indicator */}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-amber-400 rounded-r-full" />
              )}

              <item.icon
                className={cn(
                  "text-base shrink-0 transition-colors",
                  active
                    ? "text-amber-500"
                    : "text-zinc-400 group-hover:text-zinc-600",
                )}
              />

              <span className="flex-1">{item.label}</span>

              {badgeCount > 0 && (
                <span className="min-w-4.5 h-4.5 px-1 rounded-full bg-amber-400 text-white text-[10px] font-bold flex items-center justify-center">
                  {badgeCount > 99 ? "99+" : badgeCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: logout */}
      <div className="px-3 py-4 border-t border-zinc-100">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-zinc-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150 w-full group">
          <RiLogoutBoxLine className="text-base text-zinc-400 group-hover:text-red-500 transition-colors" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
