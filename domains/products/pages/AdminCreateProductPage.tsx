"use client";

import React from "react";
import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useCreateProduct } from "../hooks/useProducts";
import { useAdminSellers } from "@/domains/sellers/hooks/useAdminSellers";
import { useAdminCategories } from "@/domains/categories/hooks/useAdminCategories";
import {
  type CreateProductInput,
  createProductSchema,
} from "../schemas/product.schema";

import { ProductPrimarySpecsForm } from "../components/admin-form/ProductPrimarySpecsForm";
import { ProductAttributesForm } from "../components/admin-form/ProductAttributesForm";
import { ProductPublishSidebar } from "../components/admin-form/ProductPublishSidebar";

export default function AdminCreateProductPage() {
  const { mutateAsync: createProductAsync, isPending } = useCreateProduct();

  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      attributes: [],
      status: "active",
      sellerId: undefined,
    },
  });

  const { data: sellersData } = useAdminSellers({ page: 1, limit: 100 });
  const { data: categoriesData } = useAdminCategories({ page: 1, limit: 100 });

  const sellers = sellersData?.data ?? [];
  const categories = categoriesData?.data ?? [];

  const currentAttributes = methods.watch("attributes") || [];

  const onSubmit = (data: CreateProductInput) => {
    const payload = {
      name: data.name,
      description: data.description,
      basePrice: Number(data.basePrice),
      categoryId: data.categoryId,
      sellerId: data.sellerId,
      status: data.status,
      attributes: data.attributes,
    };

    toast.promise(createProductAsync(payload), {
      loading: "Publishing product listing core parameters...",
      success: () => {
        methods.reset();
        return "Product created successfully! Proceeding to upload asset images.";
      },
      error: (err: any) =>
        err?.response?.data?.message || "Failed to create product listing.",
    });
  };

  return (
    <div className="space-y-6 font-sans max-w-6xl mx-auto pb-12">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
      >
        <RiArrowLeftLine />
        Back to Products Catalog
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">
          Publish New Product
        </h1>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
        >
          <div className="lg:col-span-2 space-y-4">
            <ProductPrimarySpecsForm categories={categories} />

            <ProductAttributesForm
              attributes={currentAttributes}
              onAttributesChange={(updated) =>
                methods.setValue("attributes", updated)
              }
            />
          </div>

          <ProductPublishSidebar sellers={sellers} isPending={isPending} />
        </form>
      </FormProvider>
    </div>
  );
}
