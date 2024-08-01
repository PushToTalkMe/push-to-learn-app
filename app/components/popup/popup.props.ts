import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
} from 'react';

export interface PopupProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  background?: 'body';
  avatar?: boolean;
  editCourse?: boolean;
  createLessons?: boolean;
  setExpanded: (value: SetStateAction<boolean>) => void;
}
