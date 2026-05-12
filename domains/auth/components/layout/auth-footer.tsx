import Link from "next/link";
import React from "react";

export default function AuthFooter() {
  return (
    <footer className="w-full mt-16 border-t border-border bg-surface-low">
      <div className="max-w-[1280px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <span className="font-sans text-2xl font-bold text-on-surface">
            Threadly
          </span>
          <p className="text-sm text-on-surface-muted max-w-[240px]">
            The curated marketplace for premium fashion and functional
            minimalism.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-on-surface-muted uppercase tracking-widest mb-1">
            Shop
          </span>
          <Link
            href="#"
            className="text-sm text-on-surface-muted hover:text-accent transition-all underline decoration-accent-warm underline-offset-4"
          >
            New Arrivals
          </Link>
          <Link
            href="#"
            className="text-sm text-on-surface-muted hover:text-accent transition-all"
          >
            Men
          </Link>
          <Link
            href="#"
            className="text-sm text-on-surface-muted hover:text-accent transition-all"
          >
            Women
          </Link>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-on-surface-muted uppercase tracking-widest mb-1">
            Support
          </span>
          <Link
            href="#"
            className="text-sm text-on-surface-muted hover:text-accent transition-all"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="text-sm text-on-surface-muted hover:text-accent transition-all"
          >
            Shipping Policy
          </Link>
          <Link
            href="#"
            className="text-sm text-on-surface-muted hover:text-accent transition-all"
          >
            Returns
          </Link>
        </div>

        {/* Contact/Legal */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-on-surface-muted uppercase tracking-widest mb-1">
            Legal
          </span>
          <Link
            href="#"
            className="text-sm text-on-surface-muted hover:text-accent transition-all"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-sm text-on-surface-muted hover:text-accent transition-all"
          >
            Contact
          </Link>
          <p className="text-sm text-on-surface-muted mt-4">
            © 2026 Threadly Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
