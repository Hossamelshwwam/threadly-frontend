"use client";

import React from "react";
import Link from "next/link";
import { RiCheckboxCircleFill, RiFileList3Line } from "react-icons/ri";
import CustomButton from "@/shared/components/custom-button/custom-button";

interface Props {
  id: string; // The order ID
}

export default function OrderConfirmationPage({ id }: Props) {
  // Optionally, you can fetch the order details here using a useGetMyOrder hook to show exact totals.
  // For the immediate success screen, displaying the ID and reassuring text is perfect.

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 font-sans text-center min-h-screen flex items-center justify-center">
      <div className="bg-white border border-zinc-100 rounded-3xl shadow-sm p-10 md:p-14 flex flex-col items-center">
        <div className="h-24 w-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
          <RiCheckboxCircleFill className="text-6xl text-emerald-500" />
        </div>

        <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight mb-2">
          Order Successfully Placed!
        </h1>
        <p className="text-zinc-500 mb-8 max-w-md mx-auto leading-relaxed">
          Thank you for shopping with Threadly. We&apos;ve received your order
          and the sellers are preparing your items for shipment.
        </p>

        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 w-full max-w-sm mb-8">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">
            Order Reference
          </p>
          <p className="text-lg font-mono font-black text-zinc-800">
            #{id.slice(-8).toUpperCase()}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/products" className="w-full sm:w-auto">
            <CustomButton
              variant="outline"
              theme="neutral"
              size="md"
              fullWidth
              className="rounded-xl font-bold"
            >
              Continue Shopping
            </CustomButton>
          </Link>
          <Link href={`/orders/${id}`} className="w-full sm:w-auto">
            <CustomButton
              variant="solid"
              theme="primary"
              size="md"
              fullWidth
              leftIcon={<RiFileList3Line />}
              className="rounded-xl font-bold shadow-md"
            >
              View Order Details
            </CustomButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
