import { useAccountQuery } from '@/queries/account';
import { useSessionQuery } from '@/queries/session';

export function useAccount() {
  const accountQuery = useAccountQuery();
  const sessionQuery = useSessionQuery();
  const session = sessionQuery.data;
  const account = accountQuery.data;
  const error = accountQuery.error?.response?.data.message;

  return {
    account: { ...account, ...session },
    isPending: accountQuery.isPending,
    isSuccess: accountQuery.isSuccess,
    error,
  };
}
