"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RiArrowLeftLine } from "react-icons/ri";
import Link from "next/link";

import useCart from "@/domains/cart/hooks/useCart";
import { useMyAddresses } from "@/domains/users/hooks/useUser";
import { usePlaceOrder } from "@/domains/orders/hooks/useCheckout";
import {
  CheckoutInput,
  checkoutSchema,
} from "@/domains/orders/schemas/checkout.schema";

import { CheckoutDeliveryForm } from "../components/checkout/CheckoutDeliveryForm";
import { CheckoutPaymentForm } from "../components/checkout/CheckoutPaymentForm";
import { CheckoutOrderSummary } from "../components/checkout/CheckoutOrderSummary";

export default function CheckoutPage() {
  const [selectAddress, setSelectAddress] = useState("");
  const [selectMethod, setSelectMethod] = useState<
    "credit_card" | "cash_on_delivery"
  >("cash_on_delivery");
  const router = useRouter();

  const { data: cartResponse, isLoading: isCartLoading } = useCart();
  const { data: addressResponse, isLoading: isAddressLoading } =
    useMyAddresses();
  const { mutateAsync: placeOrderAsync, isPending } = usePlaceOrder();

  const cart = cartResponse?.data;
  const addresses = addressResponse?.data || [];

  // useEffect(() => {
  //   if (!isCartLoading && (!cart || cart.items.length === 0)) {
  //     router.push("/cart");
  //   }
  // }, [cart, isCartLoading, router]);

  const onSubmit = async () => {
    const payload = {
      paymentMethod: selectMethod,
      addressId: selectAddress,
    };

    toast.promise(placeOrderAsync(payload), {
      loading: "Processing your secure payment...",
      success: (res) => {
        router.push(`/orders/${res.data.order._id}/confirmation`);
        return "Order placed successfully!";
      },
      error: (err: any) =>
        err?.response?.data?.message ||
        "Failed to place order. Please try again.",
    });
  };

  if (isCartLoading || isAddressLoading) {
    return (
      <div className="py-32 text-center text-zinc-500 font-sans">
        Preparing secure checkout...
      </div>
    );
  }

  const subtotal = cart?.total ?? 0;
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  return (
    <div className="bg-zinc-50 font-sans min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching the design */}
        <div className="mb-6 space-y-4">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
          >
            <RiArrowLeftLine size={16} /> Back to Cart
          </Link>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
            Checkout
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* LEFT COLUMN: The Stacked Cards */}
          <div className="flex-1 w-full space-y-6">
            <CheckoutDeliveryForm
              addresses={addresses}
              selectAddress={selectAddress}
              setSelectAddress={setSelectAddress}
            />

            <CheckoutPaymentForm
              selectMethod={selectMethod}
              setSelectMethod={setSelectMethod}
            />
          </div>

          {/* RIGHT COLUMN: Order Summary Card */}
          <div className="shrink-0 space-y-6">
            <CheckoutOrderSummary
              cartItems={cart?.items || []}
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
              isPending={isPending}
              onSubmit={onSubmit}
              disabled={!selectAddress || isPending}
            />

            {/* Trust Badges Card */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-3 font-sans">
              {[
                "Premium quality materials",
                "Secure 256-bit encryption",
                "Fast & reliable shipping",
                "Dedicated customer support",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-zinc-600 font-medium"
                >
                  <span className="text-amber-500 font-extrabold text-base select-none">
                    ✓
                  </span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
