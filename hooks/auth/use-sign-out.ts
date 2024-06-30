import { useResetSession } from '@/queries/session';
import { authControllerSignOut } from '@/api/generated';
import { ROUTES } from '@/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useSignOut() {
  const resetSession = useResetSession();
  const router = useRouter();
  const signOutMutation = useMutation({
    mutationFn: authControllerSignOut,
    onSuccess() {
      router.push(ROUTES.SIGN_IN);
      resetSession();
    },
  });

  return {
    isPending: signOutMutation.isPending,
    signOut: signOutMutation.mutate,
  };
}
