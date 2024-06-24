import { ROUTES } from '@/constants/routes';
import { useSessionQuery } from '@/queries/session';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { Loader } from '../components/loader/loader';

export function ProtectedPageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const { isLoading, isError } = useSessionQuery();

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    router.replace(ROUTES.SIGN_IN);
  }
  return <>{children}</>;
}
