import { imageValidation } from '@/helpers/image-validation';
import { useCoursePatchDurationMutation } from '@/queries/courses/queries';
import { useForm } from 'react-hook-form';

export function useCoursePatchDuration(courseId: number) {
  const { register, handleSubmit, watch, formState } = useForm<{
    durationCourseForInput: string;
  }>();

  const patchCourse = useCoursePatchDurationMutation(courseId);

  const errorMessage = patchCourse.error ? 'Ошибка при отправке' : undefined;

  return {
    isPending: patchCourse.isPending,
    isSuccess: patchCourse.isSuccess,
    register,
    watch,
    formState,
    handlePatchDuration: handleSubmit((data) => {
      patchCourse.mutate({ duration: data.durationCourseForInput });
    }),
    errorMessage,
  };
}
