import {
  coursesControllerGetAllCourses,
  coursesControllerGetCourseById,
  coursesControllerGetMyCourses,
  coursesControllerGetNotMyCourseById,
  coursesControllerGetPageLesson,
} from '@/api/generated';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const coursesAllListKey = ['coursesAllList'] as unknown[];
const coursesMyListKey = ['coursesMyList'] as unknown[];
const coursesItemKey = ['coursesItem'] as unknown[];
const coursesSectionsListKey = ['coursesSections'] as unknown[];
const lessonItemKey = ['lessonItem'] as unknown[];

export function useCoursesAllListQuery() {
  return useQuery({
    queryKey: coursesAllListKey,
    queryFn: coursesControllerGetAllCourses,
  });
}

export function useCoursesMyListQuery() {
  return useQuery({
    queryKey: coursesMyListKey,
    queryFn: coursesControllerGetMyCourses,
  });
}

export function useCourseSectionsListQuery(courseId: number) {
  return useQuery({
    queryKey: [coursesSectionsListKey, courseId],
    queryFn: () => coursesControllerGetCourseById(courseId),
  });
}

export function useCoursesItemQuery(courseId: number) {
  return useQuery({
    queryKey: [coursesItemKey, courseId],
    queryFn: () => coursesControllerGetNotMyCourseById(courseId),
  });
}

export function useLessonItemQuery(
  courseId: number,
  sectionId: number,
  lessonId: number,
) {
  return useQuery({
    queryKey: [lessonItemKey, courseId, sectionId, lessonId],
    queryFn: () =>
      coursesControllerGetPageLesson(courseId, sectionId, lessonId),
  });
}
