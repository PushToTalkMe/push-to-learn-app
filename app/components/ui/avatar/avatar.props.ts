import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface AvatarProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  url?: string;
  mini?: true;
}
