import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface SpanProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  children: ReactNode;
  type?: 'text' | 'number';
}
