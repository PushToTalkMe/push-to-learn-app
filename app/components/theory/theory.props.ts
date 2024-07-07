import { LessonDtoWithViewed } from '@/api/generated';
import { HTMLAttributes, DetailedHTMLProps } from 'react';

export interface TheoryProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  lesson: LessonDtoWithViewed;
}
