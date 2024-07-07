import { HTMLAttributes, DetailedHTMLProps } from 'react';

export interface CommentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  firstName: string;
  lastName: string;
  createdAt: Date;
  text: string;
}
