import { useCoursesMyListQuery } from '@/queries/courses/queries';

export function useCoursesMyItems() {
  const coursesListQuery = useCoursesMyListQuery();

  const courses = coursesListQuery.data ?? [];
  return { courses, isPending: coursesListQuery.isPending };
}
