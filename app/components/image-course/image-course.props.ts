import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface ImageCourseProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  url?: string;
  type?: 'myCourses' | 'notMyCourses' | 'buy';
}
