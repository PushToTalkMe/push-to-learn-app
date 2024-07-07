import { useLessonItemQuery } from '@/queries/courses/queries';

export function useLessonItem(
  courseId: number,
  sectionId: number,
  lessonId: number,
) {
  const lessonQuery = useLessonItemQuery(courseId, sectionId, lessonId);

  const lesson = lessonQuery.data;
  return {
    lesson,
    isPending: lessonQuery.isPending,
    isSuccess: lessonQuery.isSuccess,
  };
}
