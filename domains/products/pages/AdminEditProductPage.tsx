"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine, RiLoader4Line } from "react-icons/ri";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useGetProduct } from "../hooks/useAdminProducts"; // adjusted to use your new hook
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { useAdminSellers } from "@/domains/sellers/hooks/useAdminSellers";
import { useAdminCategories } from "@/domains/categories/hooks/useAdminCategories";
import {
  type UpdateProductInput,
  updateProductSchema,
} from "../schemas/product.schema";

import { ProductPrimarySpecsForm } from "../components/create/ProductPrimarySpecsForm";
import { ProductAttributesForm } from "../components/create/ProductAttributesForm";
import { ProductPublishSidebar } from "../components/create/ProductPublishSidebar";
import CustomButton from "@/shared/components/custom-button/custom-button";

interface Props {
  id: string;
}

export default function AdminEditProductPage({ id }: Props) {
  const router = useRouter();

  // 1. Fetch current single product snapshot parameters directly from your authorized Admin endpoint
  const { data: productData, isLoading: isProductLoading } = useGetProduct(id);
  const { mutateAsync: updateProductAsync, isPending: isUpdating } =
    useUpdateProduct();

  // 2. Fetch context selection drops
  const { data: sellersData } = useAdminSellers({ page: 1, limit: 100 });
  const { data: categoriesData } = useAdminCategories({ page: 1, limit: 100 });

  const sellers = sellersData?.data ?? [];
  const categories = categoriesData?.data ?? [];

  const product = productData?.data;

  // 3. Initialize React Hook Form engine
  const methods = useForm<UpdateProductInput>({
    resolver: zodResolver(updateProductSchema),
  });

  // 4. Pre-populate parameters into inputs as soon as the data resolves cleanly
  useEffect(() => {
    if (product) {
      methods.reset({
        name: product.name,
        description: product.description,
        basePrice: product.basePrice,
        categoryId:
          typeof product.categoryId === "object"
            ? product.categoryId._id
            : product.categoryId,
        sellerId:
          product.sellerId && typeof product.sellerId === "object"
            ? product.sellerId._id
            : product.sellerId || "",
        status: product.status,
        attributes: product.attributes || [],
      });
    }
  }, [product, methods.reset]);

  const currentAttributes = methods.watch("attributes") || [];

  const onSubmit = (data: UpdateProductInput) => {
    const payload = {
      name: data.name,
      description: data.description,
      basePrice: Number(data.basePrice),
      categoryId: data.categoryId,
      sellerId: data.sellerId || undefined,
      status: data.status,
      attributes: data.attributes,
    };

    toast.promise(updateProductAsync({ id, payload }), {
      loading: "Saving product parameter adjustments...",
      success: () => {
        router.push(`/admin/products/${id}`);
        return "Product configurations updated successfully!";
      },
      error: (err: any) =>
        err?.response?.data?.message || "Failed to adjust product listing.",
    });
  };

  if (isProductLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 font-sans gap-3">
        <RiLoader4Line className="text-3xl text-amber-500 animate-spin" />
        <p className="text-sm font-semibold text-zinc-500">
          Retrieving catalog record context...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center font-sans">
        <p className="text-zinc-500 font-bold text-lg">
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
    <div className="space-y-6 font-sans max-w-6xl mx-auto pb-12">
      <Link
        href={`/admin/products/${id}`}
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
      >
        <RiArrowLeftLine />
        Cancel and Return to View Detail
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">
            Modify Listing Parameters
          </h1>
          <p className="text-xs text-on-surface-muted mt-0.5">
            Editing: {product.name}
          </p>
        </div>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
        >
          <div className="lg:col-span-2 space-y-4">
            {/* Re-use shared presentational spec form */}
            <ProductPrimarySpecsForm categories={categories} />

            {/* Re-use shared attributes panel form */}
            <ProductAttributesForm
              attributes={currentAttributes}
              onAttributesChange={(updated) =>
                methods.setValue("attributes", updated)
              }
            />
          </div>

          {/* Re-use shared sidebar workflow deck */}
          <ProductPublishSidebar sellers={sellers} isPending={isUpdating} />
        </form>
      </FormProvider>
    </div>
  );
}
