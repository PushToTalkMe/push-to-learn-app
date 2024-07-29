import { useAccountQuery, useUpdateAccountMutation } from '@/queries/account';
import { useForm } from 'react-hook-form';

export function useAccountUpdate() {
  const accountQuery = useAccountQuery();

  const { register, handleSubmit, watch, formState, reset } = useForm<{
    firstName?: string;
    lastName?: string;
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
    handleSubmit: handleSubmit((data) => {
      const dto: { firstName?: string; lastName?: string; username?: string } =
        {};
      if (data.firstName) {
        dto.firstName = data.firstName;
      }
      if (data.lastName) {
        dto.lastName = data.lastName;
      }
      if (data.username) {
        dto.username = data.username;
      }
      if (dto.firstName || dto.lastName || dto.username) {
        reset();
        return updateAccountMutation.mutate(dto);
      } else {
        return;
      }
    }),
    watch,
    formState,
    account: accountQuery,
    isSuccess: accountQuery.isSuccess,
    errorMessage,
  };
}
