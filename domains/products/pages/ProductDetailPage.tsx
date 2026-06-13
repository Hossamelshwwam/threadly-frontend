"use client";

import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import { useProductDetail } from "@/domains/products/hooks/useProductDetail";
import { useProductReviews } from "@/domains/reviews/hooks/useProductReviews";
import { ImageGallery } from "../../products/components/product-detail/ImageGallery";
import { ProductInfo } from "../../products/components/product-detail/ProductInfo";
import { VariantSelector } from "../../products/components/product-detail/VariantSelector";
import { AddToCartSection } from "../../products/components/product-detail/AddToCartSection";
import { ProductBreadcrumb } from "../../products/components/product-detail/ProductBreadcrumb";
import { ProductAttributes } from "../../products/components/product-detail/ProductAttributes";
import { ProductDetailSkeleton } from "../../products/components/product-detail/ProductDetailSkeleton";
import { ReviewsSection } from "../../products/components/product-detail/ReviewsSection";
import { useVariantSelection } from "../hooks/useVariantSelection";

interface ProductDetailPageProps {
  slug: string;
}

export default function ProductDetailPage({ slug }: ProductDetailPageProps) {
  const { data, isLoading } = useProductDetail(slug);
  const product = data?.product;
  const variants = data?.variants ?? [];

  const {
    selectedColor,
    selectedSize,
    selectedVariant,
    displayPrice,
    maxStock,
    hasVariants,
    setSelectedColor,
    setSelectedSize,
  } = useVariantSelection(variants, product?.basePrice ?? 0);

  const { data: reviewsData } = useProductReviews(product?._id ?? "", {
    limit: 5,
  });

  const reviews = reviewsData?.data?.reviews ?? [];
  const averageRating = reviewsData?.data?.averageRating ?? 0;
  const totalReviews = reviewsData?.data?.totalReviews ?? 0;
  const ratingBreakdown = reviewsData?.data?.ratingBreakdown;

  if (isLoading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="text-center p-12 bg-white rounded-3xl border border-zinc-100 shadow-sm max-w-md w-full">
          <h1 className="text-2xl font-black text-zinc-950 mb-3">
            Product Not Found
          </h1>
          <p className="text-zinc-500 mb-8 leading-relaxed">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed from our catalog.
          </p>
          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 font-bold text-white transition-all hover:bg-amber-600 hover:-translate-y-0.5 active:translate-y-0"
          >
            Browse Products <RiArrowRightLine size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductBreadcrumb product={product} />

        {/* 50/50 Layout Grid to match the new Gallery direction */}
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-1">
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Sticky Product Action Box */}
          <div className="mt-10 lg:col-span-1 lg:mt-0">
            {/* Removed the white box/borders to make it feel like an editorial layout */}
            <div className="sticky top-32 flex flex-col gap-10 pl-0 lg:pl-8 xl:pl-12">
              <ProductInfo
                product={product}
                displayPrice={displayPrice}
                basePrice={product.basePrice}
                averageRating={averageRating}
                totalReviews={totalReviews}
              />

              {hasVariants && (
                <div className="py-2">
                  <VariantSelector
                    variants={variants}
                    selectedColor={selectedColor}
                    selectedSize={selectedSize}
                    onColorChange={setSelectedColor}
                    onSizeChange={setSelectedSize}
                  />
                </div>
              )}

              <div className="rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100">
                <AddToCartSection
                  productId={product._id}
                  inventoryId={selectedVariant?._id}
                  maxStock={maxStock}
                  hasVariants={hasVariants}
                  price={displayPrice}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section 1: Specifications / Attributes */}
        {product.attributes && product.attributes.length > 0 && (
          <div className="mt-16 rounded-3xl bg-white p-6 sm:p-10 shadow-sm border border-zinc-100">
            <ProductAttributes attributes={product.attributes} />
          </div>
        )}

        {/* Bottom Section 2: Reviews */}
        {product._id && (
          <div className="mt-8 rounded-3xl bg-white p-6 sm:p-10 shadow-sm border border-zinc-100">
            <ReviewsSection
              reviews={reviews}
              averageRating={averageRating}
              totalReviews={totalReviews}
              ratingBreakdown={ratingBreakdown}
            />
          </div>
        )}
      </div>
    </div>
  );
}
