import { imageValidation } from '@/helpers/image-validation';
import { useCoursePatchTagsMutation } from '@/queries/courses/queries';
import { useForm } from 'react-hook-form';

export function useCoursePatchTags(courseId: number) {
  const { register, handleSubmit, watch, control } = useForm<{
    tagsCourseForInput: { value: string }[];
  }>();

  const patchCourse = useCoursePatchTagsMutation(courseId);

  const errorMessage = patchCourse.error ? 'Ошибка при отправке' : undefined;

  return {
    isPending: patchCourse.isPending,
    isSuccess: patchCourse.isSuccess,
    register,
    watch,
    control,
    handlePatchTags: handleSubmit((data) => {
      const tags = data.tagsCourseForInput.map((tag) => tag.value);
      if (tags.length === 0) {
        return;
      }
      patchCourse.mutate({ tags });
    }),
    errorMessage,
  };
}
