'use client';
//Настроить active и viewed (поменять местами)
import React from 'react';
import {
  LessonTabForAdminProps,
  LessonTabForUserProps,
  LessonTabProps,
} from './lesson-tab.props';
import styles from './lesson-tab.module.css';
import { Loader, P } from '..';
import cn from 'classnames';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import ExerciseIcon from './icons/exercise.svg';
import TheoryIcon from './icons/theory.svg';
import { queryClient } from '@/api/query-client';
import { useQueryClient } from '@tanstack/react-query';

export function LessonTab({
  id,
  sectionId,
  courseId,
  title,
  sequence,
  viewed,
  sectionSequence,
  type,
  edit,
  opened,
}: LessonTabProps): JSX.Element {
  return (
    <>
      {edit ? (
        <LessonTabForAdmin
          id={id}
          sectionId={sectionId}
          courseId={courseId}
          key={id}
          title={title}
          type={type}
          sequence={sequence}
          sectionSequence={sectionSequence}
          opened={opened}
        />
      ) : (
        <LessonTabForUser
          id={id}
          sectionId={sectionId}
          courseId={courseId}
          key={id}
          title={title}
          type={type}
          sequence={sequence}
          viewed={viewed}
          sectionSequence={sectionSequence}
          opened={opened}
        />
      )}
    </>
  );
}

export function LessonTabForUser({
  id,
  sectionId,
  courseId,
  title,
  sequence,
  viewed,
  sectionSequence,
  type,
  opened,
}: LessonTabForUserProps) {
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
      })}
    >
      <button
        className={cn(styles.title, {
          [styles.active]: pathname.includes(
            `sections/${sectionId}/lessons/${id}`,
          ),
        })}
        onClick={handleClickButton}
      >
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

export function LessonTabForAdmin({
  id,
  sectionId,
  courseId,
  title,
  sequence,
  sectionSequence,
  type,
  opened,
}: LessonTabForAdminProps) {
  const router = useRouter();
  const pathname = usePathname();
  const handleClickButton = () => {
    router.push(
      `${ROUTES.EDIT_COURSE}/${courseId}/sections/${sectionId}/lessons/${id}`,
    );
  };
  return (
    <div
      className={cn(styles.lessonTab, styles.tabForAdmin, {
        [styles.opened]: opened === true,
      })}
    >
      <div
        className={cn(styles.title, {
          [styles.active]: pathname.includes(
            `sections/${sectionId}/lessons/${id}`,
          ),
        })}
        onClick={handleClickButton}
      >
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
      </div>
    </div>
  );
}
