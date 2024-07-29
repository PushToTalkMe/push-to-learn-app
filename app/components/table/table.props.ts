import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface TableProps<T>
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  caption: string;
  headers: string[];
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}
