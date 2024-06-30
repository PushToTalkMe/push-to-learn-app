import { useAccountQuery } from '@/queries/account';

export function useAccountUpdate() {
  const accountQuery = useAccountQuery();
  const course = accountQuery.data;
  const error = accountQuery.error?.response?.data.message;

  return { course, isPending: accountQuery.isPending, error };
}
