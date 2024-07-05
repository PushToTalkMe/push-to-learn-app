import { LessonStatType } from '@/api/generated';

export interface LessonTabProps {
  title: string;
  sequence: number;
  type: LessonStatType;
  viewed: boolean;
  opened: boolean;
}
