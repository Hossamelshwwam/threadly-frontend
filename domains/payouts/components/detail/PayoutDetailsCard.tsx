"use client";

import React from "react";
import Link from "next/link";
import {
  RiStore2Line,
  RiShoppingBag3Line,
  RiBankLine,
  RiExchangeDollarLine,
} from "react-icons/ri";
import type { Payout } from "../../types/payout.types";
import { PayoutStatusBadge } from "../PayoutStatusBadge";

export function PayoutDetailsCard({ payout }: { payout: Payout }) {
  const date = new Date(payout.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-zinc-50 rounded-2xl border border-zinc-200 shadow-sm font-sans flex flex-col overflow-hidden">
      {/* 1. Hero Section: Using Zinc Surfaces and Success Tokens */}
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 bg-zinc-100 relative overflow-hidden">
        {/* Subtle background decoration */}
        <RiExchangeDollarLine className="absolute -bottom-6 -right-4 text-zinc-300 opacity-20 text-9xl pointer-events-none" />

        <div className="relative z-10">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
            Total Net Payout
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-zinc-400">EGP</span>
            <h2 className="text-4xl font-black text-zinc-950 tracking-tight">
              {payout.netAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </h2>
          </div>
          <p className="text-xs text-zinc-500 mt-2 font-medium">
            Requested on {date}
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <PayoutStatusBadge status={payout.status} />
        </div>
      </div>

      {/* 2. Metadata Grid: Using Amber & Terracotta Brand Colors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 p-6 sm:p-8 gap-8 border-b border-zinc-200 bg-zinc-50">
        {/* Vendor Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-zinc-800">
            <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <RiStore2Line size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                Beneficiary
              </p>
              <Link
                href={`/admin/sellers/${payout.sellerId?._id}`}
                className="text-sm font-bold hover:text-amber-600 transition-colors"
              >
                {payout.sellerId?.storeName || "Unknown Seller"}
              </Link>
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-zinc-800">
            <div className="w-10 h-10 rounded-full bg-terra-50 border border-terra-200 flex items-center justify-center shrink-0">
              <RiShoppingBag3Line size={18} className="text-terra-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                Source Ledger
              </p>
              {payout.orderId ? (
                <Link
                  href={`/admin/orders/${payout.orderId._id}`}
                  className="text-sm font-bold font-mono hover:text-terra-600 transition-colors"
                >
                  {payout.orderId.orderNumber}
                </Link>
              ) : (
                <span className="text-sm font-medium italic text-zinc-400">
                  Unlinked / N/A
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bank Routing Details */}
      {payout.sellerId?.bankDetails && (
        <div className="p-6 sm:p-8 border-b border-zinc-200 bg-zinc-100">
          <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2 mb-5">
            <RiBankLine className="text-zinc-500" size={16} /> Routing
            Information
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                Bank Name
              </p>
              <p className="text-sm font-semibold text-zinc-950">
                {payout.sellerId.bankDetails.bankName || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                Account Holder
              </p>
              <p className="text-sm font-semibold text-zinc-950">
                {payout.sellerId.bankDetails.accountName || "N/A"}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                IBAN / Account Number
              </p>
              <div className="flex items-center">
                <p className="text-sm font-mono font-bold text-zinc-950 tracking-widest bg-zinc-50 border border-zinc-200 py-2 px-3 rounded-md shadow-xs select-all">
                  {payout.sellerId.bankDetails.accountNumber || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Financial Breakdown (Semantic States) */}
      <div className="p-6 sm:p-8 space-y-4 bg-zinc-50">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">
          Settlement Calculation
        </h4>

        <div className="flex justify-between items-center text-sm">
          <span className="text-zinc-600 font-medium">
            Gross Transaction Volume
          </span>
          <span className="font-semibold text-zinc-900">
            EGP{" "}
            {payout.amount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-zinc-600 font-medium">Platform Commission</span>
          {/* Strictly using your defined error semantic tokens here */}
          <span className="font-semibold text-error bg-error-bg px-2 py-0.5 rounded border border-error/20">
            - EGP{" "}
            {payout.platformFee.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="pt-4 border-t border-dashed border-zinc-300 flex justify-between items-end">
          <span className="text-sm font-bold text-zinc-900">
            Final Disbursement
          </span>
          {/* Strictly using your defined success semantic token here */}
          <span className="font-black text-xl text-success">
            EGP{" "}
            {payout.netAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
