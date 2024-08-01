import { useSectionsDeleteMutation } from '@/queries/courses/queries';

export function useSectionDelete() {
  const sectionDelete = useSectionsDeleteMutation();

  const newSection = sectionDelete.data;
  const error = sectionDelete.error?.response?.data.message;

  return {
    newSection,
    error,
    handleDeleteSection: (sectionId: number) => sectionDelete.mutate(sectionId),
    isPending: sectionDelete.isPending,
    isSuccess: sectionDelete.isSuccess,
  };
}
