// domains/products/pages/SellerCreateProductPage.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine } from "react-icons/ri";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useCreateProduct } from "../hooks/useProducts";
import { useListCategories } from "@/domains/categories/hooks/useCategories";
import {
  type CreateProductInput,
  createProductSchema,
} from "../schemas/product.schema";

// NEW SELLER FORM COMPONENTS
import { SellerProductPrimarySpecs } from "../components/seller-form/SellerProductPrimarySpecs";
import { SellerProductAttributes } from "../components/seller-form/SellerProductAttributes";
import { SellerProductPublishSidebar } from "../components/seller-form/SellerProductPublishSidebar";

export default function SellerCreateProductPage() {
  const router = useRouter();
  const { mutateAsync: createProductAsync, isPending } = useCreateProduct();

  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: { attributes: [], status: "draft" },
  });

  const { data: categoriesData } = useListCategories();
  const categories = categoriesData?.data ?? [];

  const currentAttributes = methods.watch("attributes") || [];

  const onSubmit = (data: CreateProductInput) => {
    const payload = {
      name: data.name,
      description: data.description,
      basePrice: Number(data.basePrice),
      categoryId: data.categoryId,
      status: data.status,
      attributes: data.attributes,
    };

    toast.promise(createProductAsync(payload), {
      loading: "Creating product...",
      success: (res) => {
        // Push them to the edit/preview page immediately so they can add images/variants!
        router.push(`/seller/products/${res.data._id}`);
        return "Product created! Now let's add some images and variants.";
      },
      error: (err: any) =>
        err?.response?.data?.message || "Failed to create product.",
    });
  };

  return (
    <div className="space-y-6 font-sans max-w-6xl mx-auto pb-12">
      <Link
        href="/seller/products"
        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:text-amber-600"
      >
        <RiArrowLeftLine /> Back to Inventory
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
            Add New Product
          </h1>
          <p className="text-sm text-zinc-500 mt-1 font-medium">
            Start by filling out the basic details, then you can add images and
            sizes.
          </p>
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
            isPending={isPending}
            submitLabel="Create Product"
          />
        </form>
      </FormProvider>
    </div>
  );
}
