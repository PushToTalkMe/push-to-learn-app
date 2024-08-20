'use client';
import {
  coursesControllerCreate,
  coursesControllerGetAllCourses,
  coursesControllerGetAllCoursesForEdit,
  coursesControllerGetCourseById,
  coursesControllerGetCourseByIdForEdit,
  coursesControllerGetMyCourses,
  coursesControllerGetNotMyCourseById,
  coursesControllerGetPageLesson,
  coursesControllerLessonViewed,
  CourseWithSectionsForEdit,
  CreateLessonDto,
  CreateSectionDto,
  LessonDto,
  lessonsControllerCreate,
  lessonsControllerDeletelesson,
  lessonsControllerPatchLesson,
  lessonsControllerPatchSequences,
  PatchSectionDto,
  PatchSequences,
  SectionDto,
  sectionsControllerCreate,
  sectionsControllerDeleteSection,
  sectionsControllerPatchSection,
  sectionsControllerPatchSequences,
  PatchLessonDto,
  lessonsControllerGetLesson,
} from '@/api/generated';
import { queryClient } from '@/api/query-client';
import { Section } from '@/app/components';
import { ROUTES } from '@/constants/routes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface ProgressProps {
  lessonCompleted: number;
  lessonCount: number;
}

const coursesAllForEdit = ['coursesAllForEdit'] as unknown[];
const coursesAllListKey = ['coursesAllList'] as unknown[];
const coursesMyListKey = ['coursesMyList'] as unknown[];
const coursesItemKey = ['coursesItem'] as unknown[];
const coursesItemCreateKey = ['coursesItemCreate'] as unknown[];
const coursesSectionsListKey = ['coursesSections'] as unknown[];
const courseWithSectionsForEditKey = ['courseWithSectionsForEdit'] as unknown[];
const lessonItemKey = ['lessonItem'] as unknown[];
const lessonEditItemKey = ['lessonEditItem'] as unknown[];
const coursesProgressListKey = ['progress'];

export function useCoursesAllQuery() {
  return useQuery({
    queryKey: coursesAllForEdit,
    queryFn: coursesControllerGetAllCoursesForEdit,
  });
}

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

export function useCourseSectionsListForEditQuery(courseId: number) {
  return useQuery({
    queryKey: [courseWithSectionsForEditKey, courseId],
    queryFn: () => coursesControllerGetCourseByIdForEdit(courseId),
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

export function useLessonEditItemQuery(lessonId: number) {
  return useQuery({
    queryKey: [lessonEditItemKey, lessonId],
    queryFn: () => lessonsControllerGetLesson(lessonId),
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

export function useSectionsPatchSequencesMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (patchSequences: PatchSequences) =>
      sectionsControllerPatchSequences(patchSequences),
    onSuccess(data: any) {
      const resCourseWithSectionsForEdit:
        | CourseWithSectionsForEdit
        | undefined = queryClient.getQueryData([
        courseWithSectionsForEditKey,
        data[0].courseId,
      ]);
      if (resCourseWithSectionsForEdit) {
        const newSections =
          resCourseWithSectionsForEdit.sectionsWithLessons.map(
            (section, index) => {
              const newSections = data
                .map((newSection: any) => {
                  if (section.id === newSection.id) {
                    return { ...section, sequence: newSection.sequence };
                  }
                  return null;
                })
                .filter((newSection: any) => newSection !== null);

              return newSections[0];
            },
          );
        const sortedNewSection = newSections.sort(
          (a, b) => a.sequence - b.sequence,
        );
        queryClient.setQueryData(
          [courseWithSectionsForEditKey, data[0].courseId],
          {
            ...resCourseWithSectionsForEdit,
            sectionsWithLessons: sortedNewSection,
          },
        );
      }
    },
  });
}

export function useLessonsPatchSequencesMutation(
  courseId: number,
  sectionId: number,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (patchSequences: PatchSequences) =>
      lessonsControllerPatchSequences(patchSequences),
    onSuccess(data: any) {
      const resCourseWithSectionsForEdit:
        | CourseWithSectionsForEdit
        | undefined = queryClient.getQueryData([
        courseWithSectionsForEditKey,
        courseId,
      ]);
      if (resCourseWithSectionsForEdit) {
        const newSections =
          resCourseWithSectionsForEdit.sectionsWithLessons.map(
            (section, index) => {
              if (section.id === sectionId) {
                const sortedLessons = data.sort(
                  (a, b) => a.sequence - b.sequence,
                );
                return { ...section, lessons: sortedLessons };
              }
              return section;
            },
          );
        queryClient.setQueryData([courseWithSectionsForEditKey, courseId], {
          ...resCourseWithSectionsForEdit,
          sectionsWithLessons: newSections,
        });
      }
    },
  });
}

export function useSectionsPatchTitleMutation(sectionId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (patchSectionDto: PatchSectionDto) =>
      sectionsControllerPatchSection(sectionId, patchSectionDto),
    onSuccess(data: SectionDto) {
      const resCourseWithSectionsForEdit:
        | CourseWithSectionsForEdit
        | undefined = queryClient.getQueryData([
        courseWithSectionsForEditKey,
        data.courseId,
      ]);
      if (resCourseWithSectionsForEdit) {
        const newSections =
          resCourseWithSectionsForEdit.sectionsWithLessons.map((section) => {
            if (section.id === sectionId) {
              return { ...section, title: data.title };
            }
            return section;
          });
        queryClient.setQueryData(
          [courseWithSectionsForEditKey, data.courseId],
          { ...resCourseWithSectionsForEdit, sectionsWithLessons: newSections },
        );
      }
    },
  });
}

export function useLessonPatchTitleMutation(
  courseId: number,
  lessonId: number,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (patchLessonDto: PatchLessonDto) =>
      lessonsControllerPatchLesson(lessonId, patchLessonDto),
    onSuccess(data: LessonDto) {
      const resCourseWithSectionsForEdit:
        | CourseWithSectionsForEdit
        | undefined = queryClient.getQueryData([
        courseWithSectionsForEditKey,
        courseId,
      ]);
      if (resCourseWithSectionsForEdit) {
        const newSections =
          resCourseWithSectionsForEdit.sectionsWithLessons.map((section) => {
            if (section.id === data.sectionId) {
              return {
                ...section,
                lessons: section.lessons.map((lesson) => {
                  if (lesson.id === data.id) {
                    return { ...lesson, title: data.title };
                  }
                  return lesson;
                }),
              };
            }
            return section;
          });
        queryClient.setQueryData([courseWithSectionsForEditKey, courseId], {
          ...resCourseWithSectionsForEdit,
          sectionsWithLessons: newSections,
        });
      }
    },
  });
}

export function useSectionsCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateSectionDto) => sectionsControllerCreate(body),
    onSuccess(data: SectionDto) {
      const resCourseWithSectionsForEdit:
        | CourseWithSectionsForEdit
        | undefined = queryClient.getQueryData([
        courseWithSectionsForEditKey,
        data.courseId,
      ]);
      if (resCourseWithSectionsForEdit) {
        const newSections = [
          ...resCourseWithSectionsForEdit.sectionsWithLessons,
          { ...data, lessons: [] },
        ];
        queryClient.setQueryData(
          [courseWithSectionsForEditKey, data.courseId],
          { ...resCourseWithSectionsForEdit, sectionsWithLessons: newSections },
        );
      }
    },
  });
}

export function useLessonCreateMutation(courseId: number) {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (body: CreateLessonDto) => lessonsControllerCreate(body),
    onSuccess(data: LessonDto) {
      const resCourseWithSectionsForEdit:
        | CourseWithSectionsForEdit
        | undefined = queryClient.getQueryData([
        courseWithSectionsForEditKey,
        courseId,
      ]);
      if (resCourseWithSectionsForEdit) {
        const newSections =
          resCourseWithSectionsForEdit.sectionsWithLessons.map((section) => {
            if (section.id === data.sectionId) {
              return {
                ...section,
                lessons: [
                  ...section.lessons,
                  {
                    id: data.id,
                    title: data.title,
                    sequence: data.sequence,
                    sectionId: data.sectionId,
                    type: data.type,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                  },
                ],
              };
            }
            return section;
          });
        queryClient.setQueryData([courseWithSectionsForEditKey, courseId], {
          ...resCourseWithSectionsForEdit,
          sectionsWithLessons: newSections,
        });
      }
      router.push(
        ROUTES.EDIT_COURSE +
          `/${courseId}` +
          '/sections' +
          `/${data.sectionId}` +
          '/lessons' +
          `/${data.id}`,
      );
    },
  });
}

export function useSectionsDeleteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sectionId: number) =>
      sectionsControllerDeleteSection(sectionId),
    onSuccess(data: SectionDto) {
      const resCourseWithSectionsForEdit:
        | CourseWithSectionsForEdit
        | undefined = queryClient.getQueryData([
        courseWithSectionsForEditKey,
        data.courseId,
      ]);
      if (resCourseWithSectionsForEdit) {
        const newSections = resCourseWithSectionsForEdit.sectionsWithLessons
          .filter((section) => section.id !== data.id)
          .map((section, index) => ({ ...section, sequence: index + 1 }));
        queryClient.setQueryData(
          [courseWithSectionsForEditKey, data.courseId],
          { ...resCourseWithSectionsForEdit, sectionsWithLessons: newSections },
        );
      }
    },
  });
}

export function useLessonsDeleteMutation(courseId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lessonId: number) => lessonsControllerDeletelesson(lessonId),
    onSuccess(data: LessonDto) {
      const resCourseWithSectionsForEdit:
        | CourseWithSectionsForEdit
        | undefined = queryClient.getQueryData([
        courseWithSectionsForEditKey,
        courseId,
      ]);
      if (resCourseWithSectionsForEdit) {
        const newSections =
          resCourseWithSectionsForEdit.sectionsWithLessons.map((section) => {
            if (section.id === data.sectionId) {
              return {
                ...section,
                lessons: section.lessons
                  .filter((lesson) => lesson.id !== data.id)
                  .map((lesson, index) => ({ ...lesson, sequence: index + 1 })),
              };
            }
            return section;
          });
        queryClient.setQueryData([courseWithSectionsForEditKey, courseId], {
          ...resCourseWithSectionsForEdit,
          sectionsWithLessons: newSections,
        });
      }
    },
  });
}
