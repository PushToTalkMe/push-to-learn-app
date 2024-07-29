import { PatchSequences } from '@/api/generated';
import { useSectionsPatchSequencesMutation } from '@/queries/courses/queries';
import { error } from 'console';

export function useSectionsPatchSequences() {
  const sectionsPatchSequences = useSectionsPatchSequencesMutation();

  const error = sectionsPatchSequences.error?.response?.data.message;

  return {
    error,
    handlePatchSequences: (patch: PatchSequences) =>
      sectionsPatchSequences.mutate(patch),
    isPending: sectionsPatchSequences.isPending,
    isSuccess: sectionsPatchSequences.isSuccess,
  };
}
