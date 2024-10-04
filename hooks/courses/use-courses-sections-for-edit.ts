import { useCourseSectionsListForEditQuery } from '@/queries/courses/queries';

export function useCourseWithSectionsForEdit(courseId: number) {
  const courseWithSectionsForEdit = useCourseSectionsListForEditQuery(courseId);

  const course = courseWithSectionsForEdit.data;
  return {
    course,
    error: courseWithSectionsForEdit.error,
    isPending: courseWithSectionsForEdit.isPending,
    isSuccess: courseWithSectionsForEdit.isSuccess,
  };
}
