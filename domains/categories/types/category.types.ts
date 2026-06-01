export interface Category {
  _id: string;
  name: string;
  slug: string;
  parentId: string | null | { _id: string; name: string; slug: string };
  isActive: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminCategoriesQueryParams {
  page?: number;
  limit?: number;
  active?: boolean | string;
}

export interface CreateCategoryPayload {
  name: string;
  parentId?: string | null;
  isActive?: boolean;
}

export interface UpdateCategoryPayload {
  name?: string;
  parentId?: string | null;
  isActive?: boolean;
}
