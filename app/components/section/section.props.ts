import { LessonStat } from '@/api/generated';

export interface SectionProps {
  id: number;
  courseId: number;
  title: string;
  sequence: number;
  lessonsStat: LessonStat[];
  paramsSectionId: number;
}
