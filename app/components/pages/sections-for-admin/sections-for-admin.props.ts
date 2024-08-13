import { SectionWithLessons } from '@/api/generated';

export interface SectionsForAdminProps {
  courseId: number;
  paramsSectionId: number;
  sectionsWithLessons: SectionWithLessons[];
}
