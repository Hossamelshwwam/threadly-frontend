// domains/products/pages/SellerEditProductPage.tsx
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine, RiLoader4Line } from "react-icons/ri";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useSellerProduct } from "../hooks/useSellerProducts";
import { useUpdateProduct } from "../hooks/useProducts";
import { useListCategories } from "@/domains/categories/hooks/useCategories";
import {
  type UpdateProductInput,
  updateProductSchema,
} from "../schemas/product.schema";

// REUSING THE SELLER FORM COMPONENTS!
import { SellerProductPrimarySpecs } from "../components/seller-form/SellerProductPrimarySpecs";
import { SellerProductAttributes } from "../components/seller-form/SellerProductAttributes";
import { SellerProductPublishSidebar } from "../components/seller-form/SellerProductPublishSidebar";

interface Props {
  id: string;
}

export default function SellerEditProductPage({ id }: Props) {
  const router = useRouter();

  const { data: productData, isLoading: isProductLoading } =
    useSellerProduct(id);
  const { mutateAsync: updateProductAsync, isPending: isUpdating } =
    useUpdateProduct();

  const { data: categoriesData } = useListCategories();
  const categories = categoriesData?.data ?? [];

  const product = productData?.data;

  const methods = useForm<UpdateProductInput>({
    resolver: zodResolver(updateProductSchema),
  });

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
      status: data.status,
      attributes: data.attributes,
    };

    toast.promise(updateProductAsync({ id, payload }), {
      loading: "Saving changes...",
      success: () => {
        router.push(`/seller/products/${id}`);
        return "Product updated successfully!";
      },
      error: (err: any) =>
        err?.response?.data?.message || "Failed to update product.",
    });
  };

  if (isProductLoading) {
    return (
      <div className="flex justify-center py-32">
        <RiLoader4Line className="text-4xl text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans max-w-6xl mx-auto pb-12">
      <Link
        href={`/seller/products/${id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors bg-white px-3 py-1.5 rounded-lg border border-zinc-100 shadow-sm w-fit"
      >
        <RiArrowLeftLine /> Return to Preview
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
            Edit Details
          </h1>
        </div>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start"
        >
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <SellerProductPrimarySpecs categories={categories} />
            <SellerProductAttributes
              attributes={currentAttributes}
              onAttributesChange={(updated) =>
                methods.setValue("attributes", updated)
              }
            />
          </div>

          <SellerProductPublishSidebar
            isPending={isUpdating}
            submitLabel="Save Changes"
          />
        </form>
      </FormProvider>
    </div>
  );
}
