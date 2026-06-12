import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";

interface AuthBackLinkProps {
  href?: string;
  label?: string;
}

export function AuthBackLink({
  href = "/login",
  label = "Back to Login",
}: AuthBackLinkProps) {
  return (
    <div className="mt-6 pt-6 border-t border-zinc-200 flex justify-center">
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-amber-600 transition-colors"
      >
        <RiArrowLeftLine size={14} />
        {label}
      </Link>
    </div>
  );
}
