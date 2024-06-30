'use client';
import React from 'react';
import styles from './card.module.css';
import { Button } from '../button/button';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export function CardFooter({
  courseId,
  type,
}: {
  courseId: number;
  type?: 'myCourses' | 'notMyCourses' | 'buy';
}) {
  const router = useRouter();

  return type === 'notMyCourses' ? (
    <div className={cn(styles.cardFooter)}>
      <Button
        appearance="ghost"
        className={cn(styles.ghost)}
        onClick={() => router.push(ROUTES.APP + `/${courseId}`)}
      >
        О курсе
      </Button>
      <Button
        appearance="primary"
        onClick={() => router.push(ROUTES.BUY + `?course=${courseId}`)}
      >
        Начать
      </Button>
    </div>
  ) : type === 'myCourses' ? (
    <div className={cn(styles.cardFooter)}>
      <Button appearance="primary">Продолжить</Button>
    </div>
  ) : (
    <></>
  );
}
