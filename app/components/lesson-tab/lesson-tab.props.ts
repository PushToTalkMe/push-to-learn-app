import { LessonStatType } from '@/api/generated';

export interface LessonTabProps {
  id: number;
  sectionId: number;
  courseId: number;
  title: string;
  sequence: number;
  sectionSequence: number;
  type: LessonStatType;
  viewed: boolean;
  opened: boolean;
}
