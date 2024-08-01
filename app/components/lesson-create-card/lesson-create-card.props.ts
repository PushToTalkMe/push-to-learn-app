import { LessonStatType } from '@/api/generated';
import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';

export interface LessonCreateCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type: LessonStatType;
  lesson: LessonStatType;
  setLesson: Dispatch<SetStateAction<LessonStatType>>;
}
