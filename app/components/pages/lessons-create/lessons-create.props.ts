import { SectionWithLessons } from '@/api/generated';
import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';

export interface LessonsCreateProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  courseId: number;
  sectionId: number;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  setSections: Dispatch<React.SetStateAction<SectionWithLessons[]>>;
}
