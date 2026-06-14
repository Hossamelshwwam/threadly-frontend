"use client";

import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";
import { toast } from "sonner";
import useCart from "../hooks/useCart";
import useUpdateCartItem from "../hooks/useUpdateCartItem";
import useRemoveCartItem from "../hooks/useRemoveCartItem";
import { CartItemRow } from "../components/CartItemRow";
import { CartSummary } from "../components/CartSummary";
import { EmptyCart } from "../components/EmptyCart";

function CartSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="mb-4 h-6 w-32 animate-pulse rounded-md bg-zinc-200" />
          <div className="h-12 w-64 animate-pulse rounded-xl bg-zinc-200" />
        </div>
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8 space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-3xl bg-white border border-zinc-100 shadow-sm"
              />
            ))}
          </div>
          <div className="mt-10 lg:col-span-4 lg:mt-0">
            <div className="h-80 animate-pulse rounded-3xl bg-white border border-zinc-100 shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { data: cartData, isLoading, itemCount, totalPrice } = useCart();
  const { mutateAsync: updateItem } = useUpdateCartItem();
  const { mutateAsync: removeItem } = useRemoveCartItem();

  const items = cartData?.data?.items ?? [];
  const hasItems = items.length > 0;

  const handleUpdateQuantity = (inventoryId: string, quantity: number) => {
    toast.promise(updateItem({ inventoryId, quantity }), {
      loading: "Updating cart...",
      success: "Cart updated successfully",
      error: (err: any) => err?.response?.data?.message || "Failed to update",
    });
  };

  const handleRemove = (inventoryId: string) => {
    toast.promise(removeItem(inventoryId), {
      loading: "Removing item...",
      success: "Item removed from cart",
      error: (err: any) => err?.response?.data?.message || "Failed to remove",
    });
  };

  if (isLoading) return <CartSkeleton />;

  return (
    <div className="min-h-screen bg-zinc-50 pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/products"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:text-amber-600"
          >
            <RiArrowLeftLine size={16} />
            Continue Shopping
          </Link>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950">
                Your Cart
              </h1>
              {hasItems && (
                <p className="mt-3 text-sm font-bold text-zinc-500">
                  {itemCount} {itemCount === 1 ? "Item" : "Items"} selected
                </p>
              )}
            </div>
          </div>
        </div>

        {!hasItems ? (
          <EmptyCart />
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
            {/* Cart Items List */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {items.map((item) => (
                <CartItemRow
                  key={item.inventoryId._id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {/* Order Summary (Sticky) */}
            <div className="mt-12 lg:col-span-4 lg:mt-0">
              <div className="sticky top-28">
                <CartSummary
                  subtotal={totalPrice}
                  itemCount={itemCount}
                  disabled={!hasItems}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
