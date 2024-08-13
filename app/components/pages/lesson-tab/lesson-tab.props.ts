import { LessonStatType, SectionWithLessons } from '@/api/generated';
import { Dispatch, SetStateAction } from 'react';

export interface LessonTabProps {
  id: number;
  sectionId: number;
  courseId: number;
  title: string;
  sequence: number;
  sectionSequence: number;
  type: LessonStatType;
  viewed?: boolean;
  edit?: boolean;
  opened: boolean;
  setSections?: Dispatch<SetStateAction<SectionWithLessons[]>>;
}

export interface LessonTabForUserProps {
  id: number;
  sectionId: number;
  courseId: number;
  title: string;
  sequence: number;
  sectionSequence: number;
  type: LessonStatType;
  viewed?: boolean;
  opened: boolean;
}

export interface LessonTabForAdminProps {
  id: number;
  sectionId: number;
  courseId: number;
  title: string;
  sequence: number;
  sectionSequence: number;
  type: LessonStatType;
  opened: boolean;
  setSections: Dispatch<SetStateAction<SectionWithLessons[]>>;
}
