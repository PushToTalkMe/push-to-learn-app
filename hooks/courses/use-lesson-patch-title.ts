import { useLessonPatchTitleMutation } from '@/queries/courses/queries';
import { useForm } from 'react-hook-form';

export function useLessonPatchTitle(courseId: number, lessonId: number) {
  const lessonPatchTitle = useLessonPatchTitleMutation(courseId, lessonId);

  const { register, handleSubmit, watch, formState } = useForm<{
    titleLessonForInput: string;
  }>();

  const error = lessonPatchTitle.error?.response?.data.message;

  return {
    error,
    handleSubmit: handleSubmit((data) =>
      lessonPatchTitle.mutate({ title: data.titleLessonForInput }),
    ),
    register,
    formState,
    watch,
    isPending: lessonPatchTitle.isPending,
    isSuccess: lessonPatchTitle.isSuccess,
  };
}
