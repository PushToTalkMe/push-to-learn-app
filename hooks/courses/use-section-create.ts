import { CreateSectionDto } from '@/api/generated';
import { useSectionsCreateMutation } from '@/queries/courses/queries';

export function useSectionCreate() {
  const sectionCreate = useSectionsCreateMutation();

  const newSection = sectionCreate.data;
  const error = sectionCreate.error?.response?.data.message;

  return {
    newSection,
    error,
    handleCreateSection: (body: CreateSectionDto) => sectionCreate.mutate(body),
    isPending: sectionCreate.isPending,
    isSuccess: sectionCreate.isSuccess,
  };
}
