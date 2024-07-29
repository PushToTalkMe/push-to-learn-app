import { useAccountGetInfoAboutAllUsersQuery } from '@/queries/account';
import { useSessionQuery } from '@/queries/session';

export function useInfo() {
  const infoQuery = useAccountGetInfoAboutAllUsersQuery();
  const info = infoQuery.data;

  const errorInfo = infoQuery.error?.response?.data.message;

  return {
    info,
    isPending: infoQuery.isPending,
    isSuccess: infoQuery.isSuccess,
    errorInfo,
  };
}
