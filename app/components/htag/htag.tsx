import React from 'react';
import { HtagProps } from './htag.props';
import styles from './htag.module.css';
import cn from 'classnames';

export const Htag = ({
  tag,
  className,
  color,
  children,
}: HtagProps): JSX.Element => {
  switch (tag) {
    case 'h1':
      return (
        <h1 className={cn(styles.h1, className)} style={{ color }}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className={cn(styles.h2, className)} style={{ color }}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={cn(styles.h3, className)} style={{ color }}>
          {children}
        </h3>
      );
    default:
      return <></>;
  }
};

export default Htag;
