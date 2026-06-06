"use client";

import React from "react";
import type { PayoutStatus } from "../types/payout.types";

interface PayoutStatusBadgeProps {
  status: PayoutStatus;
}

export function PayoutStatusBadge({ status }: PayoutStatusBadgeProps) {
  const styles: Record<PayoutStatus, string> = {
    pending: "bg-warning-bg border-warning/30 text-warning",
    processing: "bg-blue-50 border-blue-200 text-blue-600",
    paid: "bg-success-bg border-success/30 text-success",
    rejected: "bg-error-bg border-error/30 text-error",
  };

  return (
    <span
      className={`inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider whitespace-nowrap font-sans ${
        styles[status] || styles.pending
      }`}
    >
      {status}
    </span>
  );
}
