export interface ProductVariant {
  _id: string;
  productId: string;
  sku: string;
  size: string;
  color: string;
  stock: number;
  reserved: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}
