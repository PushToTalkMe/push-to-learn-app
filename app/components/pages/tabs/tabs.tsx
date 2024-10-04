'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './tabs.module.css';
import cn from 'classnames';
import { TabsProps } from './tabs.props';
import { ROUTES } from '@/constants/routes';

function Tabs({}: TabsProps): JSX.Element {
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
      <Link
        className={cn(styles.tab, {
          [styles.active]: pathname.includes('/courses/created'),
        })}
        href={ROUTES.CREATED_COURSES}
      >
        Редактор курсов
      </Link>
    </div>
  );
}

export { Tabs };
