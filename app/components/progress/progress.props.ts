import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ProgressProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: number;
}
