import { useCoursesItemQuery } from '@/queries/courses/queries';

export function useCoursesItem(courseId: number) {
  const courseQuery = useCoursesItemQuery(courseId);

  const course = courseQuery.data;
  const error = courseQuery.error?.response?.data.message;
  return { course, isPending: courseQuery.isPending, error };
}
