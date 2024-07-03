import { useCoursesAllListQuery } from '@/queries/courses/queries';

export function useCoursesAllItems() {
  const coursesListQuery = useCoursesAllListQuery();

  const courses = coursesListQuery.data ?? [];
  return { courses, isPending: coursesListQuery.isPending };
}
