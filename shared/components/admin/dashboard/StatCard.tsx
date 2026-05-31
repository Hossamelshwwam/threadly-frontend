import { cn } from "@/shared/lib";
import { type IconType } from "react-icons";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: IconType;
  trend?: {
    label: string;
    positive?: boolean;
  };
  accent?: boolean;
  loading?: boolean;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  accent = false,
  loading = false,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-5 flex flex-col gap-4 transition-shadow hover:shadow-md",
        accent
          ? "bg-amber-400 border-amber-400 text-white"
          : "bg-white border-zinc-200",
      )}
    >
      <div className="flex items-start justify-between">
        <p
          className={cn(
            "text-xs font-600 uppercase tracking-widest",
            accent ? "text-amber-100" : "text-zinc-400",
          )}
        >
          {label}
        </p>
        <span
          className={cn(
            "w-9 h-9 rounded-md flex items-center justify-center shrink-0",
            accent ? "bg-amber-500/40" : "bg-zinc-50 border border-zinc-200",
          )}
        >
          <Icon
            className={cn(
              "text-base",
              accent ? "text-white" : "text-amber-500",
            )}
          />
        </span>
      </div>

      {loading ? (
        <div className="h-8 w-24 rounded bg-zinc-100 animate-pulse" />
      ) : (
        <p
          className={cn(
            "text-3xl font-700 leading-none",
            accent ? "text-white" : "text-zinc-900",
          )}
        >
          {value}
        </p>
      )}

      {trend && (
        <p
          className={cn(
            "text-xs font-500",
            accent
              ? "text-amber-100"
              : trend.positive
                ? "text-success"
                : "text-zinc-400",
          )}
        >
          {trend.label}
        </p>
      )}
    </div>
  );
}
