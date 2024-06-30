import { useCoursesListQuery } from '@/queries/courses/queries';

export function useCoursesItems() {
  const coursesListQuery = useCoursesListQuery();

  const courses = coursesListQuery.data ?? [];
  return { courses, isPending: coursesListQuery.isPending };
}
