"use client";

import React from "react";
import { RiUserLine, RiMapPinLine, RiPhoneLine } from "react-icons/ri";
import type { Order, ShippingAddress } from "../../types/order.types";

interface Props {
  address: ShippingAddress;
  buyer?: Order["buyerId"];
}

export function SellerOrderCustomerDetails({ address, buyer }: Props) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-5 space-y-4 font-sans shadow-xs">
      <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
        <RiMapPinLine className="text-amber-500 text-lg" />
        <h2 className="text-sm font-bold text-zinc-900">
          Shipping Destination
        </h2>
      </div>

      <div className="space-y-3 text-sm">
        {buyer && (
          <div className="flex items-start gap-2.5">
            <RiUserLine className="text-zinc-400 mt-0.5 shrink-0" size={16} />
            <div className="flex flex-col">
              <span className="font-bold text-zinc-800">
                {address.fullName || buyer.name}
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                {buyer.email}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2.5 border-t border-zinc-50 pt-2.5">
          <RiMapPinLine className="text-zinc-400 mt-0.5 shrink-0" size={16} />
          <div className="text-zinc-600 font-medium flex flex-col gap-0.5 leading-relaxed">
            <span>{address.street}</span>
            <span>
              {address.city}, {address.state}
            </span>
            <span>
              {address.country}{" "}
              {address.postalCode && `(${address.postalCode})`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 border-t border-zinc-50 pt-2.5 text-zinc-600 font-medium">
          <RiPhoneLine className="text-zinc-400 shrink-0" size={16} />
          <span>{address.phone}</span>
        </div>
      </div>
    </div>
  );
}
