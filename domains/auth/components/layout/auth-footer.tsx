import Link from "next/link";

export default function AuthFooter() {
  return (
    <footer className="w-full mt-16 border-t border-zinc-200 bg-zinc-50">
      <div className="max-w-[1280px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold text-zinc-900">Threadly</span>
          <p className="text-sm text-zinc-500 max-w-[240px]">
            The curated marketplace for premium fashion and functional
            minimalism.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1">
            Shop
          </span>
          <Link
            href="#"
            className="text-sm text-zinc-500 hover:text-amber-600 transition-colors"
          >
            New Arrivals
          </Link>
          <Link
            href="#"
            className="text-sm text-zinc-500 hover:text-amber-600 transition-colors"
          >
            Men
          </Link>
          <Link
            href="#"
            className="text-sm text-zinc-500 hover:text-amber-600 transition-colors"
          >
            Women
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1">
            Support
          </span>
          <Link
            href="#"
            className="text-sm text-zinc-500 hover:text-amber-600 transition-colors"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="text-sm text-zinc-500 hover:text-amber-600 transition-colors"
          >
            Shipping Policy
          </Link>
          <Link
            href="#"
            className="text-sm text-zinc-500 hover:text-amber-600 transition-colors"
          >
            Returns
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1">
            Legal
          </span>
          <Link
            href="#"
            className="text-sm text-zinc-500 hover:text-amber-600 transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-sm text-zinc-500 hover:text-amber-600 transition-colors"
          >
            Contact
          </Link>
          <p className="text-sm text-zinc-500 mt-4">
            © 2026 Threadly Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
