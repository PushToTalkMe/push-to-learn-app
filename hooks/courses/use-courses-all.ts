import { useCoursesAllQuery } from '@/queries/courses/queries';

export function useCoursesAll() {
  const coursesAllQuery = useCoursesAllQuery();

  const courses = coursesAllQuery.data ?? [];
  const errorInfo = coursesAllQuery.error?.response?.data.message;

  return {
    courses,
    isPending: coursesAllQuery.isPending,
    isSuccess: coursesAllQuery.isSuccess,
    errorInfo,
  };
}
