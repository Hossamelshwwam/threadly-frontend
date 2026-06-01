"use client";

import { RiBankCardLine } from "react-icons/ri";
import type { SellerProfile } from "../../types/seller.types";

interface SellerBankDetailsProps {
  seller: SellerProfile;
}

export function SellerBankDetails({ seller }: SellerBankDetailsProps) {
  // Gracefully fallback fields referencing registration payload signatures
  const bankName = seller.bankDetails.bankName || "—";
  const accountName = seller.bankDetails.accountName || "—";
  const accountNumber = seller.bankDetails.accountNumber || "—";

  return (
    <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden flex flex-col font-sans">
      <div className="px-5 py-4 border-b border-zinc-100 flex items-center gap-2">
        <RiBankCardLine className="text-amber-500 text-base" />
        <h2 className="text-base font-bold text-zinc-900">
          Settlement Account Configuration
        </h2>
      </div>

      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: "Bank Institution", value: bankName },
          { label: "Beneficiary Name", value: accountName },
          {
            label: "Account Number / IBAN",
            value: accountNumber,
            className: "font-mono select-all text-xs tracking-wider",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-zinc-50 border border-zinc-100 rounded-md p-3.5 flex flex-col gap-1"
          >
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
              {item.label}
            </span>
            <p
              className={`text-sm font-semibold text-zinc-800 truncate ${item.className || ""}`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
