import { PaginatedApiResponse } from "@/shared/types/api.types";
import type { Product } from "@/domains/products/types/product.types";
import type { ProductVariant } from "@/domains/products/types/inventory.types";

export interface PublicProductsParams {
  category?: string;
  seller?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  rating?: number;
}

export interface ProductDetailResponse {
  product: Product;
  variants: ProductVariant[];
}

export type ListProductsResponse = PaginatedApiResponse<Product>;

export type GetProductBySlugResponse = {
  success: boolean;
  data: ProductDetailResponse;
};