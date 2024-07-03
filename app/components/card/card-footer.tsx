'use client';
import React from 'react';
import styles from './card.module.css';
import { Button } from '../button/button';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { CardFooterProps } from './card.props';

export function CardFooter({
  courseId,
  sectionId,
  lessonId,
  type,
}: CardFooterProps) {
  const router = useRouter();

  return type === 'notMyCourses' ? (
    <div className={cn(styles.cardFooter)}>
      <Button
        appearance="ghost"
        className={cn(styles.ghost)}
        onClick={() => router.push(ROUTES.COURSES + `/${courseId}`)}
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
      <Button
        appearance="primary"
        onClick={() =>
          router.push(
            ROUTES.APP +
              `/${courseId}` +
              `/sections/${sectionId}` +
              `/lessons/${lessonId}`,
          )
        }
      >
        Продолжить
      </Button>
    </div>
  ) : (
    <></>
  );
}
