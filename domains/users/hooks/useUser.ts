import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../api/users.api";
import { AddAddressInput } from "../schemas/address.schema";
import { UpdateProfileInput } from "../schemas/profile.schema";

export const userKey = {
  all: "users",
  getMe: ["me"],
  getAddress: ["address"],
};

export function useGetMe() {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: usersApi.getMe,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfileInput) =>
      usersApi.updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [userKey.all, ...userKey.getMe],
      });
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => usersApi.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [userKey.all, ...userKey.getMe],
      });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: { currentPassword: string; newPassword: string }) =>
      usersApi.changePassword(payload),
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

export function useUpdateAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: AddAddressInput }) =>
      usersApi.updateAddress(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [userKey.all, ...userKey.getAddress, ...userKey.getMe],
      });
    },
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersApi.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [userKey.all, ...userKey.getAddress, ...userKey.getMe],
      });
    },
  });
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersApi.setDefaultAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [userKey.all, ...userKey.getAddress, ...userKey.getMe],
      });
    },
  });
}
