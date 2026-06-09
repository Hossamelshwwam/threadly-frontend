import { cn } from "@/lib/utils";
import { SellerProfile } from "../types/seller.types";

function SellerStatusBadge({ status }: { status: SellerProfile["status"] }) {
  const styles = {
    approved: "bg-success-bg text-success border-success/30",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    suspended: "bg-error-bg text-error border-error/30",
  };
  return (
    <span
      className={cn(
        "text-xs font-semibold px-2 py-0.5 rounded-md border capitalize",
        styles[status],
      )}
    >
      {status}
    </span>
  );
}

export default SellerStatusBadge;
