import { ROUTES } from '@/constants/routes';
import { useSessionQuery } from '@/queries/session';
import { redirect } from 'next/navigation';
import { PropsWithChildren, ReactElement, ReactNode, useEffect } from 'react';
import { Loader } from '../app/components/loader/loader';

export function protectedPageAdmin<P>(Component: (props: P) => ReactElement) {
  return function ProtectedPage(props: PropsWithChildren<P>) {
    const { isLoading, isError, isSuccess, data } = useSessionQuery();

    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      redirect(ROUTES.SIGN_IN);
    }

    if (isSuccess && data.role === 'admin') {
      return <Component {...props} />;
    } else {
      redirect(ROUTES.ALL_COURSES);
    }
  };
}
