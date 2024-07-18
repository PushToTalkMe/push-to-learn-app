import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
} from 'react';

export interface PopupProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  setExpanded: (value: SetStateAction<boolean>) => void;
}
