import { ROUTES } from '@/constants/routes';
import { useSessionQuery } from '@/queries/session';
import { redirect } from 'next/navigation';
import { PropsWithChildren, ReactElement, ReactNode, useEffect } from 'react';
import { Loader } from '../app/components/loader/loader';

export function protectedPage<P>(Component: (props: P) => ReactElement) {
  return function ProtectedPage(props: PropsWithChildren<P>) {
    const { isLoading, isError, isSuccess } = useSessionQuery();

    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      redirect(ROUTES.SIGN_IN);
    }

    if (isSuccess) {
      return <Component {...props} />;
    }
  };
}
