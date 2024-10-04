'use client';
import { coursesControllerCreate } from '@/api/generated';
import { ROUTES } from '@/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export function useCoursesCreate() {
  const router = useRouter();

  const { control, register, handleSubmit, watch, formState } = useForm<{
    title: string;
    duration: string;
    tags: { value: '' }[];
  }>({
    defaultValues: {
      title: '',
      duration: '',
      tags: [{ value: '' }],
    },
  });

  const createCourseItem = useMutation({
    mutationFn: coursesControllerCreate,
    onSuccess(data) {
      router.push(
        ROUTES.EDIT_COURSE +
          `/${data.id}` +
          '/sections' +
          `/${data.lastSectionId}` +
          '/lessons' +
          `/${data.lastLessonId}`,
      );
    },
  });

  const errorMessage = createCourseItem.error?.response?.data.message;

  return {
    register,
    errorMessage,
    handleSubmit: handleSubmit((data) => {
      const tags = data.tags.map((tag) => tag.value);
      if (tags.length === 0) {
        return;
      }
      createCourseItem.mutate({ ...data, tags });
    }),
    isPending: createCourseItem.isPending,
    watch,
    control,
    formState,
    isSuccess: createCourseItem.isSuccess,
  };
}
