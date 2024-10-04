import {
  LessonDto,
  LessonStat,
  LessonsWithoutContent,
  PatchSequences,
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
  countSections?: number;
  paramsSectionId: number;
  edit?: boolean;
  setSections?: Dispatch<SetStateAction<SectionWithLessons[]>>;
  provided?: DraggableProvided;
  handleDeleteSection?: (sectionId: number) => void;
  handleSuccessPatchTitleSection?: (isSuccess: boolean) => void;
  handleDeleteLesson?: (lessonId: number) => void;
  handleLessonsPatchSequences?: (
    sectionId: number,
    patch: PatchSequences,
  ) => void;
  handleErrorPatchTitleSection?: (error: string) => void;
  handleSuccessPatchTitleLesson?: (isSuccess: boolean) => void;
  handleErrorPatchTitleLesson?: (error: string) => void;
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
  countSections: number;
  paramsSectionId: number;
  edit: boolean;
  setSections: Dispatch<SetStateAction<SectionWithLessons[]>>;
  provided: DraggableProvided;
  handleDeleteSection: (sectionId: number) => void;
  handleSuccessPatchTitleSection: (isSuccess: boolean) => void;
  handleDeleteLesson: (lessonId: number) => void;
  handleLessonsPatchSequences: (
    sectionId: number,
    patch: PatchSequences,
  ) => void;
  handleErrorPatchTitleSection: (error: string) => void;
  handleSuccessPatchTitleLesson: (isSuccess: boolean) => void;
  handleErrorPatchTitleLesson: (error: string) => void;
}
