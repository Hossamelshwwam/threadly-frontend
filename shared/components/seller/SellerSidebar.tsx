"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib";
import { sellerNavItems } from "./nav-config";

export function SellerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col font-sans h-screen sticky top-0 shrink-0">
      {/* Brand Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-zinc-200">
        <Link href="/seller" className="flex items-center gap-2 outline-none">
          <div className="w-8 h-8 rounded bg-main flex items-center justify-center shadow-sm">
            <span className="text-white font-black text-lg leading-none">
              T
            </span>
          </div>
          <span className="text-lg font-bold text-zinc-900 tracking-tight">
            Vendor Hub
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
        <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-4 px-2 mt-4">
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
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors outline-none group",
                isActive
                  ? "bg-amber-50 text-main font-bold"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900",
              )}
            >
              <item.icon
                className={cn(
                  "text-[18px]",
                  isActive
                    ? "text-main"
                    : "text-zinc-400 group-hover:text-zinc-500",
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer Area */}
      <div className="p-4 border-t border-zinc-200">
        <div className="bg-zinc-50 rounded-lg p-3 border border-zinc-200">
          <p className="text-xs font-bold text-zinc-900">Need Help?</p>
          <p className="text-[10px] text-zinc-500 mt-1 mb-2 leading-relaxed">
            Contact platform support for seller assistance.
          </p>
          <a
            href="mailto:support@threadly.com"
            className="text-xs text-main hover:text-main-warm hover:underline font-bold transition-colors"
          >
            Contact Support &rarr;
          </a>
        </div>
      </div>
    </aside>
  );
}
