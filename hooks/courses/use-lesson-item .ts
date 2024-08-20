import { useLessonEditItemQuery } from '@/queries/courses/queries';

export function useLessonItem(lessonId: number) {
  const lessonQuery = useLessonEditItemQuery(lessonId);

  const lesson = lessonQuery.data;
  return {
    lesson,
    isPending: lessonQuery.isPending,
    isSuccess: lessonQuery.isSuccess,
  };
}
