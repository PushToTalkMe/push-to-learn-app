import {
  coursesControllerGetAllCourses,
  coursesControllerGetCourseById,
  coursesControllerGetMyCourses,
  coursesControllerGetNotMyCourseById,
  coursesControllerGetPageLesson,
  coursesControllerLessonViewed,
} from '@/api/generated';
import { ROUTES } from '@/constants/routes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface ProgressProps {
  lessonCompleted: number;
  lessonCount: number;
}

const coursesAllListKey = ['coursesAllList'] as unknown[];
const coursesMyListKey = ['coursesMyList'] as unknown[];
const coursesItemKey = ['coursesItem'] as unknown[];
const coursesSectionsListKey = ['coursesSections'] as unknown[];
const lessonItemKey = ['lessonItem'] as unknown[];
const coursesProgressListKey = ['progress'];

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

export function useCourseProgressQuery(courseId: number) {
  return useQuery({
    queryKey: [coursesProgressListKey, courseId],
    queryFn: async () => {
      const { lessonCompleted, lessonCount } =
        await coursesControllerGetCourseById(courseId);
      return { lessonCompleted, lessonCount };
    },
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

//Поработать с типами Query
export function useLessonViewedMutation(
  courseId: number,
  sectionId: number,
  lessonId: number,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      coursesControllerLessonViewed(courseId, sectionId, lessonId),
    onSuccess() {
      queryClient.setQueryData(
        [lessonItemKey, courseId, sectionId, lessonId],
        true,
      );
      const resCourseWithSections = queryClient.getQueryData([
        coursesSectionsListKey,
        courseId,
      ]);
      const sectionsWithLessonsStat =
        resCourseWithSections.sectionsWithLessonsStat.map((section) => {
          if (section.id === sectionId) {
            const lessonsStat = section.lessonsStat.map((lesson) => {
              if (lesson.id === lessonId) {
                const viewed = true;
                return { ...lesson, viewed };
              } else {
                return lesson;
              }
            });
            return { ...section, lessonsStat };
          } else {
            return section;
          }
        });
      queryClient.setQueryData([coursesSectionsListKey, courseId], {
        ...resCourseWithSections,
        sectionsWithLessonsStat,
      });
      const resProgress: ProgressProps = queryClient.getQueryData([
        coursesProgressListKey,
        courseId,
      ]);
      queryClient.setQueryData([coursesProgressListKey, courseId], {
        lessonCompleted: resProgress.lessonCompleted + 1,
        lessonCount: resProgress.lessonCount,
      });
    },
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [lessonItemKey, courseId, sectionId, lessonId],
      });
    },
  });
}
