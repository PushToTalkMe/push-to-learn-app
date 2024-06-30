import { useAccountQuery, useUpdateAccountMutation } from '@/queries/account';
import { useForm } from 'react-hook-form';

export function useAccountUpdate() {
  const { register, handleSubmit } = useForm<{
    firstName: string;
    lastName: string;
    username: string;
  }>();
  const accountQuery = useAccountQuery();

  const updateAccountMutation = useUpdateAccountMutation();

  return {
    isPending: updateAccountMutation.isPending,
    register,
    handleSubmit: handleSubmit((data) => updateAccountMutation.mutate(data)),
    isReady: accountQuery.isSuccess,
  };
}
