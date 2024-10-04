import { useCoursesCreatedListQuery } from '@/queries/courses/queries';

export function useCoursesCreatedItems() {
  const coursesListQuery = useCoursesCreatedListQuery();

  const courses = coursesListQuery.data ?? [];
  return { courses, isPending: coursesListQuery.isPending };
}
