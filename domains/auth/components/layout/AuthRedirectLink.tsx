import Link from "next/link";
import type { ReactNode } from "react";

interface AuthRedirectLinkProps {
  href: string;
  children: ReactNode;
}

export function AuthRedirectLink({ href, children }: AuthRedirectLinkProps) {
  return (
    <p className="mt-8 text-sm text-zinc-500">
      {children}{" "}
      <Link
        href={href}
        className="text-amber-600 font-semibold hover:text-amber-700 hover:underline transition-all"
      >
        {href === "/login" ? "Sign in" : "Sign up"}
      </Link>
    </p>
  );
}
