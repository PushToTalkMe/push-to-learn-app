import { LessonStatType } from '@/api/generated';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface SideUpProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  status: 'success' | 'error';
  children: ReactNode;
}
