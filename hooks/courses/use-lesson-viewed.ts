import {
  authControllerSignIn,
  commentsControllerCreate,
} from '@/api/generated';
import { queryClient } from '@/api/query-client';
import { ROUTES } from '@/constants/routes';
import { useCommentsQuery, useUpdateQueryMutation } from '@/queries/comment';
import { useLessonViewedMutation } from '@/queries/courses/queries';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export function useLessonViewed(
  courseId: number,
  sectionId: number,
  lessonId: number,
) {
  const lessonViewedMutation = useLessonViewedMutation(
    courseId,
    sectionId,
    lessonId,
  );

  const errorMessage = lessonViewedMutation.error ? 'Ошибка входа' : undefined;

  return {
    errorMessage,
    handleViewed: () => lessonViewedMutation.mutate(),
    isPending: lessonViewedMutation.isPending,
    isSuccess: lessonViewedMutation.isSuccess,
  };
}
