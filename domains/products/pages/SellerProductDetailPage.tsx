// domains/products/pages/SellerProductDetailPage.tsx
"use client";

import React from "react";
import Link from "next/link";
import { RiArrowLeftLine, RiEdit2Line } from "react-icons/ri";

import { useSellerProduct } from "../hooks/useSellerProducts";
import { useArchiveProduct } from "../hooks/useProducts";

// NEW SELLER COMPONENTS
import { SellerProductSidebar } from "../components/seller-detail/SellerProductSidebar";
import { SellerProductAttributes } from "../components/seller-detail/SellerProductAttributes";
import { SellerProductImages } from "../components/seller-detail/SellerProductImages";
import { SellerProductVariants } from "../components/seller-detail/SellerProductVariants";

import CustomButton from "@/shared/components/custom-button/custom-button";
import { ProductReviewsPanel } from "@/domains/reviews/components/admin/ProductReviewsPanel";

function DetailSkeleton() {
  return (
    <div className="lg:grid-cols-3 grid gap-6 animate-pulse font-sans">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white border border-zinc-100 rounded-2xl h-[400px]" />
        <div className="bg-white border border-zinc-100 rounded-2xl h-40" />
      </div>
      <div className="col-span-1 bg-white border border-zinc-100 rounded-2xl h-96" />
    </div>
  );
}

interface Props {
  id: string;
}

export default function SellerProductDetailPage({ id }: Props) {
  const { data: product, isLoading } = useSellerProduct(id);
  const { mutateAsync: archiveAsync, isPending: isArchiving } =
    useArchiveProduct();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-5 w-32 rounded bg-zinc-100 animate-pulse" />
        <DetailSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center font-sans bg-white rounded-2xl border border-zinc-100">
        <p className="text-zinc-500 font-semibold text-lg">
          Product not found in your inventory
        </p>
        <Link href="/seller/products" className="mt-4">
          <CustomButton variant="outline" theme="neutral" size="sm">
            Back to Inventory
          </CustomButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans max-w-7xl mx-auto pb-12">
      {/* Merchant Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm">
        <Link
          href="/seller/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <RiArrowLeftLine className="text-lg" /> Back to Inventory
        </Link>

        <Link href={`/seller/products/${product.data._id}/edit`}>
          <CustomButton
            variant="solid"
            theme="primary"
            size="sm"
            leftIcon={<RiEdit2Line />}
            className="rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            Edit Product
          </CustomButton>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT COMPONENT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-zinc-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm relative overflow-hidden">
            {/* Soft background glow for merchant feel */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -z-10 opacity-50" />

            <div>
              <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
                {product.data.name}
              </h1>
              <p className="text-sm text-zinc-400 mt-1 font-medium">
                SKU:{" "}
                <span className="font-mono text-zinc-500">
                  {product.data._id}
                </span>
              </p>
            </div>

            {/* New Merchant Gallery */}
            <SellerProductImages
              productId={product.data._id}
              images={product.data.images || []}
            />

            <div className="pt-4">
              <h3 className="text-sm font-bold text-zinc-900 mb-2">
                Description
              </h3>
              <div className="bg-zinc-50/50 rounded-xl p-4 border border-zinc-100">
                <p className="text-zinc-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {product.data.description}
                </p>
              </div>
            </div>
          </div>

          <SellerProductVariants productId={product.data._id} />

          <SellerProductAttributes attributes={product.data.attributes} />
        </div>

        {/* RIGHT COMPONENT COLUMN */}
        <div className="col-span-1">
          <SellerProductSidebar
            product={product.data}
            isArchiving={isArchiving}
            onArchive={archiveAsync}
          />
        </div>
      </div>
    </div>
  );
}
