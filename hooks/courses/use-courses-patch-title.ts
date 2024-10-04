import { imageValidation } from '@/helpers/image-validation';
import { useCoursePatchTitleMutation } from '@/queries/courses/queries';
import { useForm } from 'react-hook-form';

export function useCoursePatchTitle(courseId: number) {
  const { register, handleSubmit, watch, formState } = useForm<{
    titleCourseForInput: string;
  }>();

  const patchCourse = useCoursePatchTitleMutation(courseId);

  const errorMessage = patchCourse.error ? 'Ошибка при отправке' : undefined;

  return {
    isPending: patchCourse.isPending,
    isSuccess: patchCourse.isSuccess,
    register,
    watch,
    formState,
    handlePatch: handleSubmit((data) => {
      patchCourse.mutate({ title: data.titleCourseForInput });
    }),
    errorMessage,
  };
}
