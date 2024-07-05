import { useAccountQuery, useUpdateAccountMutation } from '@/queries/account';
import { useForm } from 'react-hook-form';

export function useAccountUpdate() {
  const accountQuery = useAccountQuery();

  const { register, handleSubmit, watch, formState } = useForm<{
    firstName: string;
    lastName: string;
    username?: string;
  }>();

  const updateAccountMutation = useUpdateAccountMutation();

  const errorMessage = updateAccountMutation.error
    ? 'Ошибка при отправке'
    : undefined;

  return {
    isPendingUpdate: updateAccountMutation.isPending,
    isSuccessUpdate: updateAccountMutation.isSuccess,
    isPendingAccount: accountQuery.isPending,
    register,
    handleSubmit: handleSubmit((data) => updateAccountMutation.mutate(data)),
    watch,
    formState,
    account: accountQuery,
    isSuccess: accountQuery.isSuccess,
    errorMessage,
  };
}
