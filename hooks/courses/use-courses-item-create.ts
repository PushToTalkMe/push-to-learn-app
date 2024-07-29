import {
  authControllerSignIn,
  CourseDto,
  coursesControllerCreate,
} from '@/api/generated';
import { ROUTES } from '@/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';

export function useCoursesCreate() {
  const router = useRouter();

  const { control, register, handleSubmit, watch, formState } = useForm<{
    title: string;
    duration: string;
    price: number;
    tags: { value: '' }[];
  }>({
    defaultValues: {
      title: '',
      duration: '',
      price: 0,
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
      createCourseItem.mutate({ ...data, tags, price: +data.price });
    }),
    isPending: createCourseItem.isPending,
    watch,
    control,
    formState,
    isSuccess: createCourseItem.isSuccess,
  };
}
