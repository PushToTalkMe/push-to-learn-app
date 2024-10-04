import { CreateSectionDto } from '@/api/generated';
import { useCoursesReleaseMutation } from '@/queries/courses/queries';

export function useCourseRelease(courseId: number) {
  const courseRelease = useCoursesReleaseMutation(courseId);

  const newSection = courseRelease.data;
  const error = courseRelease.error?.response?.data.message;

  return {
    newSection,
    error,
    handleReleaseCourse: () => courseRelease.mutate(),
    isPending: courseRelease.isPending,
    isSuccess: courseRelease.isSuccess,
  };
}
