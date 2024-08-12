import { authControllerSignUp } from '@/api/generated';
import { ROUTES } from '@/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export function useSignUpForm() {
  const router = useRouter();

  const { register, handleSubmit, watch, formState } = useForm<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>();

  const signUpMutation = useMutation({
    mutationFn: authControllerSignUp,
    onSuccess() {
      router.push(ROUTES.ALL_COURSES);
    },
  });

  const errorMessage = signUpMutation.error
    ? signUpMutation.error.response?.data.message
    : undefined;

  return {
    register,
    errorMessage,
    handleSubmit: handleSubmit((data) => signUpMutation.mutate(data)),
    isPending: signUpMutation.isPending,
    watch,
    formState,
    isSuccess: signUpMutation.isSuccess,
  };
}
