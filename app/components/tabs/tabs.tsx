'use client';
import React from 'react';
import styles from './tabs.module.css';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { Span } from '..';
import { TabsProps } from './tabs.props';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

function Tabs(): JSX.Element {
  const pathname = usePathname();
  return (
    <div className={styles.tabsContainer}>
      <Link
        className={cn(styles.tab, {
          [styles.active]: pathname.includes('/courses/my'),
        })}
        href={ROUTES.APP}
      >
        Мои курсы
      </Link>
      <Link
        className={cn(styles.tab, {
          [styles.active]: pathname.includes('/courses/all'),
        })}
        href={ROUTES.ALL_COURSES}
      >
        Все курсы
      </Link>
    </div>
  );
}

export { Tabs };
