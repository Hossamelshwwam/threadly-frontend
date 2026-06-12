"use client";

import Link from "next/link";
import {
  RiAddLine,
  RiShoppingBag3Line,
  RiBox3Line,
  RiStarLine,
} from "react-icons/ri";

const actions = [
  { href: "/seller/products/new", label: "New Product", icon: RiAddLine },
  { href: "/seller/orders", label: "View Orders", icon: RiShoppingBag3Line },
  { href: "/seller/products", label: "Products", icon: RiBox3Line },
  { href: "/seller/profile", label: "Store Settings", icon: RiStarLine },
];

function QuickActionButton({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-zinc-200 hover:border-amber-300 hover:bg-amber-50/50 transition-colors group"
    >
      <Icon className="text-lg text-zinc-400 group-hover:text-amber-500 transition-colors" />
      <span className="text-xs font-semibold text-zinc-600 group-hover:text-amber-700 transition-colors text-center">
        {label}
      </span>
    </Link>
  );
}

export function QuickActionsWidget() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-5">
      <h2 className="text-base font-bold text-zinc-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <QuickActionButton key={action.href} {...action} />
        ))}
      </div>
    </div>
  );
}
