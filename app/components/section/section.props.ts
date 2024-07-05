import { LessonStat } from '@/api/generated';

export interface SectionProps {
  title: string;
  sequence: number;
  lessonsStat: LessonStat[];
}
