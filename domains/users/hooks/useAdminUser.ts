import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../api/users.api";
import { userKeys } from "./useAdminUsers";

export function useAdminUser(id: string) {
  return useQuery({
    queryKey: userKeys.adminDetail(id),
    queryFn: () => usersApi.adminGetUser(id),
    enabled: !!id,
  });
}
