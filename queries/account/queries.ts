import {
  accountControllerGetAccount,
  accountControllerGetAvatar,
  accountControllerGetInfoAboutAllUsers,
  accountControllerPatchAccount,
  accountControllerPatchAvatar,
} from '@/api/generated';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const accountKey = ['account'];
const infoAboutUsers = ['info'];
const accountAvatarKey = ['accountAvatar'];

export function useAccountQuery() {
  return useQuery({
    queryKey: accountKey,
    queryFn: accountControllerGetAccount,
  });
}
export function useUpdateAccountMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountControllerPatchAccount,
    onSuccess(data) {
      queryClient.setQueryData(accountKey, data);
    },
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: accountKey });
    },
  });
}

export function useAccountAvatarUpdateQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountControllerPatchAvatar,
    onSuccess(data) {
      queryClient.setQueryData(accountKey, data);
    },
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: accountAvatarKey });
    },
  });
}

export function useAccountGetInfoAboutAllUsersQuery() {
  return useQuery({
    queryKey: infoAboutUsers,
    queryFn: accountControllerGetInfoAboutAllUsers,
  });
}
