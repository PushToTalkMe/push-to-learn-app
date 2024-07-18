import { useCourseSectionsListQuery } from '@/queries/courses/queries';

export function useCoursesSectionsList(courseId: number) {
  const courseSectionsListQuery = useCourseSectionsListQuery(courseId);

  const course = courseSectionsListQuery.data;
  return {
    course,
    isPending: courseSectionsListQuery.isPending,
    isSuccess: courseSectionsListQuery.isSuccess,
  };
}
