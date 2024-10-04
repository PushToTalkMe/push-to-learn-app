import { PatchSequences } from '@/api/generated';
import { useLessonsPatchSequencesMutation } from '@/queries/courses/queries';

export function useLessonsPatchSequences(courseId: number) {
  const lessonsPatchSequences = useLessonsPatchSequencesMutation(courseId);

  const error = lessonsPatchSequences.error?.response?.data.message;

  return {
    error,
    handlePatchSequences: (sectionId: number, patch: PatchSequences) =>
      lessonsPatchSequences.mutate({ sectionId, patchSequences: patch }),
    isPending: lessonsPatchSequences.isPending,
    isSuccess: lessonsPatchSequences.isSuccess,
  };
}
