'use client';
import React from 'react';
import { LessonTabProps } from './lesson-tab.props';
import styles from './lesson-tab.module.css';
import { P } from '..';
import cn from 'classnames';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import ExerciseIcon from './icons/exercise.svg';
import TheoryIcon from './icons/theory.svg';

export function LessonTab({
  id,
  sectionId,
  courseId,
  title,
  sequence,
  sectionSequence,
  type,
  viewed,
  opened,
}: LessonTabProps): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();

  const handleClickButton = () => {
    router.push(
      `${ROUTES.APP}/${courseId}/sections/${sectionId}/lessons/${id}`,
    );
  };
  return (
    <div
      className={cn(styles.lessonTab, {
        [styles.opened]: opened === true,
        [styles.viewed]: viewed === true,
        [styles.active]: pathname.includes(
          `sections/${sectionId}/lessons/${id}`,
        ),
      })}
    >
      <button className={cn(styles.title)} onClick={handleClickButton}>
        <P size="large">
          {sectionSequence}.{sequence} {title}
        </P>
        {type === 'Exercise' && (
          <div className={cn(styles.icon)}>
            <ExerciseIcon />
          </div>
        )}
        {type === 'Theory' && (
          <div className={cn(styles.icon)}>
            <TheoryIcon />
          </div>
        )}
      </button>
    </div>
  );
}
