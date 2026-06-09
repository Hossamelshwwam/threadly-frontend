import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "../api/categories.api";

export const categoryKeys = {
  all: ["categories"] as const,
  list: () => [...categoryKeys.all, "global", "list"] as const,
};

export function useListCategories() {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn: () => categoriesApi.listCategories(),
  });
}
