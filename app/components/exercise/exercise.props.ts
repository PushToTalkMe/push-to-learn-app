import { LessonDtoWithViewed } from '@/api/generated';
import { HTMLAttributes, DetailedHTMLProps } from 'react';

export interface ExerciseProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  lesson: LessonDtoWithViewed;
}
