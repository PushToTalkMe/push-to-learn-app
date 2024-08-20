import { useCommentsQuery } from '@/queries/comment';
import { useLessonItemQuery } from '@/queries/courses/queries';

export function useLessonItemWithComments(
  courseId: number,
  sectionId: number,
  lessonId: number,
) {
  const lessonQuery = useLessonItemQuery(courseId, sectionId, lessonId);
  const commentsQuery = useCommentsQuery(lessonId);

  const lesson = lessonQuery.data;
  const comments = commentsQuery.data;
  return {
    lesson,
    comments,
    isPending: lessonQuery.isPending,
    isSuccess: lessonQuery.isSuccess,
  };
}
