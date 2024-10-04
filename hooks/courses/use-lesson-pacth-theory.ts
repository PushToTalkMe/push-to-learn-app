'use client';
import { PatchLessonDto } from '@/api/generated';
import { useLessonPatchTheoryMutation } from '@/queries/courses/queries';

export function useLessonPatchTheory(lessonId: number) {
  const lessonPatchTheory = useLessonPatchTheoryMutation(lessonId);

  const error = lessonPatchTheory.error?.response?.data.message;

  return {
    error,
    handlePatchTheory: (patch: PatchLessonDto) =>
      lessonPatchTheory.mutate(patch),
    isPending: lessonPatchTheory.isPending,
    isSuccess: lessonPatchTheory.isSuccess,
  };
}
