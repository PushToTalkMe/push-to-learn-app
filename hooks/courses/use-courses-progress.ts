import { useCourseProgressQuery } from '@/queries/courses/queries';

export function useCoursesProgress(courseId: number) {
  const res = useCourseProgressQuery(courseId);

  const progress = res.data;
  return {
    progress,
    isPending: res.isPending,
    isSuccess: res.isSuccess,
  };
}
