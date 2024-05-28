import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface RightMenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  children: ReactNode[];
}
