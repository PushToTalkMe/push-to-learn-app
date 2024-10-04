'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import cn from 'classnames';
import styles from './card.module.css';
import { CardFooterProps } from './card.props';
import { Button } from '@/app/components/ui';
import { ROUTES } from '@/constants/routes';

export function CardFooter({
  courseId,
  sectionId,
  lessonId,
  inDeveloping,
  type,
}: CardFooterProps) {
  const router = useRouter();

  return type === 'notMyCourses' ? (
    <div className={cn(styles.cardFooter)}>
      <Button
        appearance="primary"
        onClick={() => router.push(ROUTES.BUY + `/${courseId}`)}
      >
        Подробнее
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
  ) : type === 'created' ? (
    <div className={cn(styles.cardFooter)}>
      <Button
        appearance="primary"
        onClick={() =>
          router.push(
            ROUTES.EDIT_COURSE +
              `/${courseId}` +
              `/sections/${sectionId}` +
              `/lessons/${lessonId}`,
          )
        }
      >
        Редактировать
      </Button>
      {inDeveloping ? (
        <p style={{ textAlign: 'center' }}>Курс в разработке</p>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
}
