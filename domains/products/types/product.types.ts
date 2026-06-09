export type ProductStatus = "draft" | "active" | "archived";

export interface ProductAttribute {
  key: string;
  value: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string | { _id: string; name: string };
  sellerId?: string | { _id: string; storeName: string };
  basePrice: number;
  status: ProductStatus;
  attributes: ProductAttribute[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductsParams {
  category?: string;
  seller?: string;
  status?: ProductStatus | "";
  search?: string;
  page?: number;
  limit?: number;
}
