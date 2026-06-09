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

// ♻️ Reusing the exact components from your Admin dashboard!
import { ProductPrimarySpecsForm } from "../components/create/ProductPrimarySpecsForm";
import { ProductAttributesForm } from "../components/create/ProductAttributesForm";
import { ProductPublishSidebar } from "../components/create/ProductPublishSidebar";

export default function SellerCreateProductPage() {
  const { mutateAsync: createProductAsync, isPending } = useCreateProduct();

  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      attributes: [],
      status: "draft",
      sellerId: undefined,
    },
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
      success: () => {
        methods.reset();
        return "Product created successfully.";
      },
      error: (err: any) =>
        err?.response?.data?.message || "Failed to create product listing.",
    });
  };

  return (
    <div className="space-y-6 font-sans max-w-6xl mx-auto pb-12">
      <Link
        href="/seller/products"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
      >
        <RiArrowLeftLine />
        Back to Products Catalog
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 leading-tight">
            Add New Product
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Start by filling out the basic details.
          </p>
        </div>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
        >
          <div className="lg:col-span-2 space-y-4">
            {/* Standardizing layout just like Admin */}
            <ProductPrimarySpecsForm categories={categories} />

            <ProductAttributesForm
              attributes={currentAttributes}
              onAttributesChange={(updated) =>
                methods.setValue("attributes", updated)
              }
            />
          </div>

          <ProductPublishSidebar isPending={isPending} enableSellers={false} />
        </form>
      </FormProvider>
    </div>
  );
}
