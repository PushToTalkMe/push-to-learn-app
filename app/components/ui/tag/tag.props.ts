import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface TagProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: 'small' | 'medium';
  children: ReactNode;
}
