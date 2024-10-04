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
  countLessons?: number;
  handleDeleteLesson?: (lessonId: number) => void;
  handleSuccessPatchTitleLesson?: (isSuccess: boolean) => void;
  handleErrorPatchTitleLesson?: (error: string) => void;
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
  countLessons: number;
  setSections: Dispatch<SetStateAction<SectionWithLessons[]>>;
  handleDeleteLesson: (lessonId: number) => void;
  handleSuccessPatchTitleLesson: (isSuccess: boolean) => void;
  handleErrorPatchTitleLesson: (error: string) => void;
}
