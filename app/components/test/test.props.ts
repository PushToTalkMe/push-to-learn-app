import { LessonDtoWithViewed } from '@/api/generated';
import { HTMLAttributes, DetailedHTMLProps } from 'react';

export interface TestProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  lesson: LessonDtoWithViewed;
}
