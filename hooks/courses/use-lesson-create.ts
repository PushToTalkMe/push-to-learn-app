import { CreateLessonDto } from '@/api/generated';
import { useLessonCreateMutation } from '@/queries/courses/queries';

export function useLessonCreate(courseId: number) {
  const lessonCreate = useLessonCreateMutation(courseId);

  const newLesson = lessonCreate.data;
  const error = lessonCreate.error?.response?.data.message;

  return {
    newLesson,
    error,
    handleCreateLesson: (body: CreateLessonDto) => lessonCreate.mutate(body),
    isPending: lessonCreate.isPending,
    isSuccess: lessonCreate.isSuccess,
  };
}
