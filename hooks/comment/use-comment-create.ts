import {
  authControllerSignIn,
  commentsControllerCreate,
} from '@/api/generated';
import { queryClient } from '@/api/query-client';
import { ROUTES } from '@/constants/routes';
import { useCommentsQuery, useUpdateQueryMutation } from '@/queries/comment';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export function useCommentCreate(lessonId: number) {
  const { register, handleSubmit, watch, formState, reset } = useForm<{
    text: string;
  }>();

  const commentCreateMutation = useUpdateQueryMutation(lessonId);

  const errorMessage = commentCreateMutation.error ? 'Ошибка входа' : undefined;

  return {
    register,
    errorMessage,
    handleSubmit: handleSubmit((data) => {
      reset();
      return commentCreateMutation.mutate({ ...data, lessonId });
    }),
    isPending: commentCreateMutation.isPending,
    watch,
    formState,
    isSuccess: commentCreateMutation.isSuccess,
  };
}
