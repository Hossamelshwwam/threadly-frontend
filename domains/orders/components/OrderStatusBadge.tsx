import type {
  OrderStatus,
  PaymentStatus,
  OrderItemStatus,
} from "../types/order.types";

interface StatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<OrderStatus, string> = {
    pending: "bg-zinc-50 border-zinc-200 text-zinc-500",
    confirmed: "bg-blue-50 border-blue-200 text-blue-600",
    partially_shipped: "bg-indigo-50 border-indigo-200 text-indigo-600",
    shipped: "bg-amber-50 border-amber-200 text-amber-600",
    delivered: "bg-success-bg border-success/30 text-success",
    cancelled: "bg-error-bg border-error/30 text-error",
  };

  const formattedStatus = status.replace(/_/g, " ");

  return (
    <span
      className={`inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider whitespace-nowrap font-sans ${styles[status] || styles.pending}`}
    >
      {formattedStatus}
    </span>
  );
}

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const styles: Record<PaymentStatus, string> = {
    unpaid: "bg-warning-bg border-warning/30 text-warning",
    paid: "bg-success-bg border-success/30 text-success",
    refunded: "bg-zinc-100 border-zinc-200 text-zinc-600",
  };

  return (
    <span
      className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide whitespace-nowrap font-sans ${styles[status] || styles.unpaid}`}
    >
      {status}
    </span>
  );
}

interface OrderItemStatusBadgeProps {
  status: OrderItemStatus;
}

export function OrderItemStatusBadge({ status }: OrderItemStatusBadgeProps) {
  const styles: Record<OrderItemStatus, string> = {
    pending: "bg-zinc-100 text-zinc-500 border-zinc-200",
    processing: "bg-warning-bg text-warning border-warning/20",
    shipped: "bg-blue-50 text-blue-600 border-blue-200",
    delivered: "bg-success-bg text-success border-success/20",
    cancelled: "bg-error-bg text-error border-error/20",
  };

  return (
    <span
      className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm border shrink-0 w-fit ${styles[status] || styles.processing}`}
    >
      {status}
    </span>
  );
}
