import {
  coursesControllerGetAllCourses,
  coursesControllerGetNotMyCourseById,
} from '@/api/generated';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const coursesListKey = ['coursesList'] as unknown[];
const coursesItemKey = ['coursesItem'] as unknown[];

export function useCoursesListQuery() {
  return useQuery({
    queryKey: coursesListKey,
    queryFn: coursesControllerGetAllCourses,
  });
}

export function useCoursesItemQuery(courseId: number) {
  return useQuery({
    queryKey: [coursesItemKey, courseId],
    queryFn: () => coursesControllerGetNotMyCourseById(courseId),
    retry: 0,
  });
}
