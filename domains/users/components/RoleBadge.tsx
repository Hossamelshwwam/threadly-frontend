import { cn } from "@/lib/utils";
import { UserRole } from "../types/user.types";

export function RoleBadge({ role }: { role: UserRole }) {
  const styles = {
    buyer: "bg-amber-50 text-amber-700 border-amber-200",
    seller: "bg-zinc-100 text-zinc-700 border-zinc-200",
    admin: "bg-zinc-800 text-white border-zinc-800",
  };
  return (
    <span
      className={cn(
        "text-xs font-600 px-2 py-0.5 rounded-md border capitalize",
        styles[role],
      )}
    >
      {role}
    </span>
  );
}
