import { imageValidation } from '@/helpers/image-validation';
import { useCourseAvatarUpdateQuery } from '@/queries/courses/queries';
import { useForm } from 'react-hook-form';

export function useCourseAvatarUpdate(courseId: number) {
  const { register, handleSubmit, watch, formState, reset } = useForm<{
    files: FileList;
  }>();

  const updateCourseAvatarMutation = useCourseAvatarUpdateQuery(courseId);

  const errorMessage = updateCourseAvatarMutation.error
    ? 'Ошибка при отправке'
    : undefined;

  return {
    isPending: updateCourseAvatarMutation.isPending,
    isSuccess: updateCourseAvatarMutation.isSuccess,
    register,
    handleSubmit: handleSubmit((data) => {
      const files = imageValidation(data.files);
      if (!files) {
        return;
      }
      const file = data.files[0];
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const value = event.target;
        if (!value) {
          return;
        }
        const fileContent = value.result;
        if (!fileContent || typeof fileContent === 'string') {
          return;
        }
        const byteArray = new Uint8Array(fileContent);
        const blob = new Blob([byteArray], { type: file.type });
        reset();
        console.log(blob);
        return updateCourseAvatarMutation.mutate({ file: blob });
      };
      reader.readAsArrayBuffer(file);
    }),
    watch,
    formState,
    errorMessage,
  };
}
