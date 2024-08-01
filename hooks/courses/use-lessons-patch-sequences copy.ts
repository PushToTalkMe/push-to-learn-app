import { PatchSequences } from '@/api/generated';
import { useLessonsPatchSequencesMutation } from '@/queries/courses/queries';
import { error } from 'console';

export function useLessonsPatchSequences(courseId: number, sectionId: number) {
  const lessonsPatchSequences = useLessonsPatchSequencesMutation(
    courseId,
    sectionId,
  );

  const error = lessonsPatchSequences.error?.response?.data.message;

  return {
    error,
    handlePatchSequences: (patch: PatchSequences) =>
      lessonsPatchSequences.mutate(patch),
    isPending: lessonsPatchSequences.isPending,
    isSuccess: lessonsPatchSequences.isSuccess,
  };
}
