import { cn } from "@/lib/utils";

export function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={cn(
        "text-xs font-600 px-2 py-0.5 rounded-md border",
        isActive ? "bg-success-bg text-success" : "bg-error-bg text-error",
      )}
    >
      {isActive ? "Active" : "Suspended"}
    </span>
  );
}
