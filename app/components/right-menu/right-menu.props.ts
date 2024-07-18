import { ReactNode } from 'react';

export interface RightMenuProps {
  title: ReactNode;
  children: ReactNode;
  expandedFromParent?: boolean;
}
