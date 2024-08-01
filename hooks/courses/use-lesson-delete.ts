import { useLessonsDeleteMutation } from '@/queries/courses/queries';

export function useLessonDelete(courseId: number) {
  const lessonDelete = useLessonsDeleteMutation(courseId);

  const deletedlesson = lessonDelete.data;
  const error = lessonDelete.error?.response?.data.message;

  return {
    deletedlesson,
    error,
    handleDeleteLesson: (lessonId: number) => lessonDelete.mutate(lessonId),
    isPending: lessonDelete.isPending,
    isSuccess: lessonDelete.isSuccess,
  };
}
