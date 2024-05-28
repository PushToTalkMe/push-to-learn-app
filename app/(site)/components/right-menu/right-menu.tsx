'use client';
import styles from './right-menu.module.css';
import cn from 'classnames';
import { useState } from 'react';
import { Button } from '../button/button';
import { usePathname } from 'next/navigation';
import { RightMenuProps } from './right-menu.props';
import BurgerIcon from './icons/burger.svg';
import CloseIcon from './icons/close.svg';

export const RightMenu = ({ children }: RightMenuProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(styles.rightMenu, {
        [styles.rightMenuExpanded]: expanded,
      })}
    >
      {expanded ? (
        <>
          <div className={styles.header}>
            {children[0]}
            <Button
              appearance="ghost"
              className={cn(styles.burger, {
                [styles.buttonExpanded]: expanded,
              })}
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              <CloseIcon />
            </Button>
          </div>
          <div className={styles.innerContainer}>{children[1]}</div>
        </>
      ) : (
        <Button
          appearance="ghost"
          className={cn(styles.burger)}
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <BurgerIcon />
        </Button>
      )}
    </div>
  );
};
