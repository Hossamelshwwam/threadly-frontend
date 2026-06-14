"use client";

import React, { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { cn } from "@/shared/lib";

import type { Address } from "@/domains/users/types/user.types";
import AddAddressForm from "./AddAddressForm";

interface Props {
  addresses: Address[];
  setSelectAddress: React.Dispatch<React.SetStateAction<string>>;
  selectAddress: string;
}

export function CheckoutDeliveryForm({
  addresses,
  setSelectAddress,
  selectAddress,
}: Props) {
  const [showAddressForm, setShowAddressForm] = useState(false);

  return (
    <section className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b border-zinc-100 pb-4">
        <h2 className="text-lg font-bold text-zinc-900">Shipping Address</h2>
        <button
          type="button"
          onClick={() => setShowAddressForm((prev) => !prev)}
          className="flex items-center gap-1 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
        >
          <RiAddLine size={16} />
          {!showAddressForm ? "Add new address" : "Use saved address"}
        </button>
      </div>

      {!showAddressForm && addresses.length > 0 ? (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 pb-4">
          {addresses.map((addr) => {
            const isSelected = selectAddress === addr._id;
            return (
              <button
                key={addr._id}
                onClick={() => setSelectAddress(addr._id)}
                className={cn(
                  "p-4 rounded-xl border-2 cursor-pointer transition-all snap-start flex flex-col gap-1 relative",
                  isSelected
                    ? "border-amber-400 bg-amber-50/30"
                    : "border-zinc-200 hover:border-zinc-300 bg-white",
                )}
              >
                <span className="font-bold text-zinc-900">{addr.label}</span>
                {/* <span className="text-xs text-zinc-500 mt-1">{addr.}</span> */}
                <span className="text-xs font-medium text-zinc-600 leading-relaxed mt-1 line-clamp-3 text-pretty">
                  {addr.street},<br />
                  {addr.city}, {addr.state} {addr.postalCode}
                </span>

                {/* Visual indicator top right */}
                {isSelected && (
                  <span className="absolute top-4 right-4 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-100" />
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <AddAddressForm setShowAddressForm={setShowAddressForm} />
      )}
    </section>
  );
}
