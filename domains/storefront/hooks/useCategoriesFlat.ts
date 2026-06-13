import { useMemo } from "react";
import { useListCategories } from "@/domains/categories/hooks/useCategories";

export interface FlatCategory {
  _id: string;
  name: string;
  slug: string;
}

function flattenTree(categories: unknown[]): FlatCategory[] {
  const result: FlatCategory[] = [];
  function walk(list: unknown[]) {
    for (const cat of list) {
      const c = cat as Record<string, unknown>;
      result.push({
        _id: c._id as string,
        name: c.name as string,
        slug: c.slug as string,
      });
      const children = c.children as unknown[] | undefined;
      if (children?.length) walk(children);
    }
  }
  walk(categories);
  return result;
}

export function useCategoriesFlat() {
  const { data, isLoading } = useListCategories();
  const flatCategories = useMemo(
    () => flattenTree(data?.data ?? []),
    [data],
  );
  return { categories: flatCategories, isLoading };
}
