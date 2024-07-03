import { useAccountQuery } from '@/queries/account';

export function useAccount() {
  const accountQuery = useAccountQuery();
  const account = accountQuery.data;
  const error = accountQuery.error?.response?.data.message;

  return { account, isPending: accountQuery.isPending, error };
}
