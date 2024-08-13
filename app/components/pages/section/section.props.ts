import {
  LessonDto,
  LessonStat,
  LessonsWithoutContent,
  SectionWithLessons,
} from '@/api/generated';
import { DraggableProvided } from '@hello-pangea/dnd';
import { Dispatch, SetStateAction } from 'react';

export interface SectionProps {
  id: number;
  courseId: number;
  title: string;
  sequence: number;
  lessonsStat?: LessonStat[];
  lessons?: LessonsWithoutContent[];
  paramsSectionId: number;
  edit?: boolean;
  setSections?: Dispatch<SetStateAction<SectionWithLessons[]>>;
  provided?: DraggableProvided;
}

export interface SectionForUserProps {
  id: number;
  courseId: number;
  title: string;
  sequence: number;
  lessonsStat?: LessonStat[];
  paramsSectionId: number;
}

export interface SectionForAdminProps {
  id: number;
  courseId: number;
  title: string;
  sequence: number;
  lessons: LessonsWithoutContent[];
  paramsSectionId: number;
  edit: boolean;
  setSections: Dispatch<SetStateAction<SectionWithLessons[]>>;
  provided: DraggableProvided;
}
