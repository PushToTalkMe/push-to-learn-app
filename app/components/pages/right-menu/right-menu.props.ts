import { CourseDto } from '@/api/generated';
import { ReactNode } from 'react';

export interface RightMenuProps {
  title: ReactNode;
  children?: ReactNode;
  expandedFromParent?: boolean;
  withoutButton?: boolean;
  courseEdit?: boolean;
  course?: CourseDto;
}
