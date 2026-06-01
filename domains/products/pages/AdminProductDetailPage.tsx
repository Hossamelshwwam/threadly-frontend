"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RiArrowLeftLine, RiImageLine, RiEditLine } from "react-icons/ri";

import {
  useAdminForceArchiveProduct,
  useGetProduct,
} from "../hooks/useAdminProducts";
import { ProductInfoSidebar } from "../components/detail/ProductInfoSidebar";
import { ProductAttributesCard } from "../components/detail/ProductAttributesCard";

import CustomButton from "@/shared/components/custom-button/custom-button";

function DetailSkeleton() {
  return (
    <div className="lg:grid-cols-3 grid gap-6 animate-pulse font-sans">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white border border-zinc-200 rounded-lg h-64" />
        <div className="bg-white border border-zinc-200 rounded-lg h-40" />
      </div>
      <div className="col-span-1 bg-white border border-zinc-200 rounded-lg h-96" />
    </div>
  );
}

interface Props {
  id: string;
}

export default function AdminProductDetailPage({ id }: Props) {
  const { data: product, isLoading } = useGetProduct(id);
  const { mutateAsync: forceArchiveAsync, isPending: isArchiving } =
    useAdminForceArchiveProduct();

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
      <div className="flex flex-col items-center justify-center py-24 text-center font-sans">
        <p className="text-zinc-500 font-semibold text-lg">
          Product record data not found
        </p>
        <Link href="/admin/products" className="mt-4">
          <CustomButton variant="outline" theme="neutral" size="sm">
            Back to Catalog
          </CustomButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans max-w-7xl mx-auto pb-12">
      {/* Header breadcrumb row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
        >
          <RiArrowLeftLine /> Back to Products Catalog
        </Link>

        <Link
          href={`/admin/products/${product.data._id}/edit`}
          className="w-fit"
        >
          <CustomButton
            variant="outline"
            theme="neutral"
            size="sm"
            leftIcon={<RiEditLine />}
          >
            Modify Listing Parameters
          </CustomButton>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT COMPONENT COLUMN: Core Specs Display */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-zinc-200 rounded-lg p-6 space-y-4 shadow-xs">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 leading-tight">
                {product.data.name}
              </h1>
              <p className="text-xs font-mono text-zinc-400 mt-1">
                Product ObjectId: {product.data._id}
              </p>
            </div>

            {/* Gallery Frame Layout */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Asset Media Gallery Preview
              </p>
              {!product.data.images || product.data.images.length === 0 ? (
                <div className="border border-dashed border-zinc-200 rounded-lg h-48 flex flex-col items-center justify-center bg-zinc-50 text-zinc-400 gap-1">
                  <RiImageLine size={32} className="text-zinc-300" />
                  <p className="text-xs font-medium">
                    No asset media files attached yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {product.data.images.map((img, i) => (
                    <div
                      key={i}
                      className="aspect-square border border-zinc-200 rounded-md relative overflow-hidden bg-zinc-50 shadow-xs"
                    >
                      <Image
                        src={img}
                        alt={`Asset preview ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-zinc-100 pt-4 space-y-1.5">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                Description
              </span>
              <p className="text-zinc-600 text-base leading-relaxed whitespace-pre-wrap">
                {product.data.description}
              </p>
            </div>
          </div>

          <ProductAttributesCard attributes={product.data.attributes} />
        </div>

        {/* RIGHT COMPONENT COLUMN: Controls & Context Summary */}
        <div className="col-span-1">
          <ProductInfoSidebar
            product={product.data}
            isArchiving={isArchiving}
            onForceArchive={forceArchiveAsync}
          />
        </div>
      </div>
    </div>
  );
}
