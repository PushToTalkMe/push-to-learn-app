import { authControllerGetSessionInfo } from '@/api/generated';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const sessionKey = ['session'];

export function useSessionQuery() {
  return useQuery({
    queryKey: sessionKey,
    queryFn: authControllerGetSessionInfo,
    retry: 0,
    staleTime: 24 * 60 * 60 * 1000,
  });
}

export function useResetSession() {
  const queryClient = useQueryClient();
  return () => queryClient.removeQueries();
}
