"use client";

import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import { useProductDetail } from "@/domains/products/hooks/useProductDetail";
import { useProductReviews } from "@/domains/reviews/hooks/useProductReviews";
import { useVariantSelection } from "../../storefront/hooks/useVariantSelection";
import { ImageGallery } from "../components/product-detail/ImageGallery";
import { ProductInfo } from "../components/product-detail/ProductInfo";
import { VariantSelector } from "../components/product-detail/VariantSelector";
import { AddToCartSection } from "../components/product-detail/AddToCartSection";
import { ProductBreadcrumb } from "../components/product-detail/ProductBreadcrumb";
import { ProductAttributes } from "../components/product-detail/ProductAttributes";
import { ProductDetailSkeleton } from "../components/product-detail/ProductDetailSkeleton";
import { ReviewsSection } from "../components/product-detail/ReviewsSection";

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
  } = useVariantSelection(variants, product?.basePrice ?? 0, slug);

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
      <div className="max-w-6xl mx-auto px-8 py-8 pt-28">
        <div className="text-center py-24">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">
            Product Not Found
          </h1>
          <p className="text-zinc-500 mb-6">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            Browse Products <RiArrowRightLine size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-8 pt-28">
      <ProductBreadcrumb product={product} />

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        <ImageGallery images={product.images} productName={product.name} />

        <div className="flex flex-col gap-6">
          <ProductInfo
            product={product}
            displayPrice={displayPrice}
            basePrice={product.basePrice}
            averageRating={averageRating}
            totalReviews={totalReviews}
          />

          <hr className="border-zinc-100" />

          {hasVariants && (
            <VariantSelector
              variants={variants}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              onColorChange={setSelectedColor}
              onSizeChange={setSelectedSize}
            />
          )}

          <ProductAttributes attributes={product.attributes} />

          <AddToCartSection
            productId={product._id}
            inventoryId={selectedVariant?._id}
            maxStock={maxStock}
            hasVariants={hasVariants}
            price={displayPrice}
          />
        </div>
      </div>

      {product._id && (
        <ReviewsSection
          reviews={reviews}
          averageRating={averageRating}
          totalReviews={totalReviews}
          ratingBreakdown={ratingBreakdown}
        />
      )}
    </div>
  );
}
