import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../api/users.api";
import { AddAddressInput } from "../schemas/address.schema";

export const userKey = {
  all: "user",
  getMe: ["me"],
  getAddress: ["address"],
};

export function useGetMe() {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: usersApi.getMe,
  });
}

export function useMyAddresses() {
  return useQuery({
    queryKey: [userKey.all, ...userKey.getAddress, ...userKey.getMe],
    queryFn: () => usersApi.getMyAddresses(),
  });
}

export function useAddAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddAddressInput) => usersApi.addAddress(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [userKey.all, ...userKey.getAddress, ...userKey.getMe],
      });
    },
  });
}
