import React from 'react';
import styles from './side-up.module.css';
import { SideUpProps } from './side-up.props';
import cn from 'classnames';

export function SideUp({ status, children }: SideUpProps) {
  return (
    <div className={cn(styles.sideUp, styles.active)}>
      <h2
        className={cn({
          [styles.saved]: status === 'success',
          [styles.error]: status === 'error',
        })}
      >
        {children}
      </h2>
    </div>
  );
}
