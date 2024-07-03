import { useAccountQuery, useUpdateAccountMutation } from '@/queries/account';
import { useForm } from 'react-hook-form';

export function useAccountUpdate() {
  const accountQuery = useAccountQuery();

  const { register, handleSubmit, setValue } = useForm<{
    firstName: string;
    lastName: string;
    username?: string;
  }>();

  const updateAccountMutation = useUpdateAccountMutation();

  const errorMessage = updateAccountMutation.error
    ? 'Ошибка при регистрации'
    : undefined;

  return {
    isPending: updateAccountMutation.isPending,
    isPendingAccount: accountQuery.isPending,
    register,
    handleSubmit: handleSubmit((data) => updateAccountMutation.mutate(data)),
    setValue,
    account: accountQuery,
    isSuccess: accountQuery.isSuccess,
    errorMessage,
  };
}
