import { cn } from "@/lib/utils";
import { Product } from "../types/product.types";

function ProductStatusBadge({ status }: { status: Product["status"] }) {
  const styles = {
    active: "bg-success-bg text-success border-success/30",
    draft: "bg-zinc-100 text-zinc-600 border-zinc-200",
    archived: "bg-error-bg text-error border-error/30",
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

export default ProductStatusBadge;
