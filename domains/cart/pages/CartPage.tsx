"use client";

import Link from "next/link";
import { RiArrowLeftLine, RiShoppingBag3Line } from "react-icons/ri";
import { toast } from "sonner";
import useCart from "../hooks/useCart";
import useUpdateCartItem from "../hooks/useUpdateCartItem";
import useRemoveCartItem from "../hooks/useRemoveCartItem";
import { CartItemRow } from "../components/CartItemRow";
import { CartSummary } from "../components/CartSummary";
import { EmptyCart } from "../components/EmptyCart";

function CartSkeleton() {
  return (
    <div className="container mx-auto px-8 py-8 pt-28">
      <div className="mb-8">
        <div className="h-10 w-64 bg-zinc-100 rounded-xl animate-pulse mb-2" />
        <div className="h-5 w-40 bg-zinc-100 rounded animate-pulse" />
      </div>
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-zinc-100 rounded-2xl animate-pulse" />
          ))}
        </div>
        <div className="h-96 bg-zinc-100 rounded-2xl animate-pulse" />
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
  const shipping = totalPrice >= 500 ? 0 : 50;

  const handleUpdateQuantity = (inventoryId: string, quantity: number) => {
    toast.promise(updateItem({ inventoryId, quantity }), {
      loading: "Updating...",
      success: "Cart updated",
      error: (err: any) =>
        err?.response?.data?.message || "Failed to update",
    });
  };

  const handleRemove = (inventoryId: string) => {
    toast.promise(removeItem(inventoryId), {
      loading: "Removing...",
      success: "Removed from cart",
      error: (err: any) =>
        err?.response?.data?.message || "Failed to remove",
    });
  };

  if (isLoading) return <CartSkeleton />;

  return (
    <div className="container mx-auto px-8 py-8 pt-28">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-amber-600 transition-colors mb-5"
        >
          <RiArrowLeftLine size={16} />
          Continue Shopping
        </Link>

        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 flex items-center gap-3">
              <RiShoppingBag3Line size={28} className="text-amber-500" />
              Shopping Cart
            </h1>
            {hasItems && (
              <p className="text-zinc-500 mt-1 font-medium">
                {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
              </p>
            )}
          </div>
        </div>
      </div>

      {!hasItems ? (
        <EmptyCart />
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map((item) => (
              <CartItemRow
                key={item.inventoryId}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              subtotal={totalPrice}
              shipping={shipping}
              itemCount={itemCount}
              disabled={!hasItems}
            />
          </div>
        </div>
      )}
    </div>
  );
}