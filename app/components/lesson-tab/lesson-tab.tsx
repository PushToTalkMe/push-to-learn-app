'use client';
//Настроить active и viewed (поменять местами)
import React from 'react';
import {
  LessonTabForAdminProps,
  LessonTabForUserProps,
  LessonTabProps,
} from './lesson-tab.props';
import styles from './lesson-tab.module.css';
import { Loader, P, Span } from '..';
import cn from 'classnames';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import TestIcon from '@/public/icons/test-mini.svg';
import TheoryIcon from '@/public/icons/theory-mini.svg';
import ExerciseIcon from '@/public/icons/exercise-mini.svg';
import TrashIcon from '@/public/icons/trash.svg';
import { useLessonDelete } from '@/hooks/courses/use-lesson-delete';
import { useLessonPatchTitle } from '@/hooks/courses/use-lesson-patch-title';

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
  setSections,
}: LessonTabProps): JSX.Element {
  return (
    <>
      {edit && setSections ? (
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
          setSections={setSections}
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
        className={cn(styles.titleAndType, {
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
        {type === 'Test' && (
          <div className={cn(styles.icon)}>
            <TestIcon />
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
  setSections,
}: LessonTabForAdminProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { handleDeleteLesson, isPending, isSuccess } =
    useLessonDelete(courseId);

  const {
    error: errorPatchTitle,
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useLessonPatchTitle(courseId, id);
  const [titleLessonForInput] = watch(['titleLessonForInput']);

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
        className={cn(styles.titleAndType, {
          [styles.active]: pathname.includes(
            `sections/${sectionId}/lessons/${id}`,
          ),
        })}
        onClick={handleClickButton}
      >
        <div className={cn(styles.title)}>
          {sectionSequence}.{sequence}
          {'\u00A0'}
          <form onSubmit={(e) => e.preventDefault()} onBlur={handleSubmit}>
            <input
              className={cn(styles.inputForLesson, {
                [styles.activeInput]: pathname.includes(
                  `sections/${sectionId}/lessons/${id}`,
                ),
              })}
              type="text"
              defaultValue={title}
              maxLength={25}
              placeholder="Заголовок"
              {...register('titleLessonForInput', {
                required: 'Введите заголовок для раздела',
              })}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
            {errors && (
              <Span className={styles.errorInput}>
                {errors.titleLessonForInput?.message}
              </Span>
            )}
            {errorPatchTitle && (
              <Span className={styles.errorInput}>{errorPatchTitle}</Span>
            )}
          </form>
        </div>

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
        {type === 'Test' && (
          <div className={cn(styles.icon)}>
            <TestIcon />
          </div>
        )}
      </div>
      <div
        className={cn(styles.buttons, {
          [styles.activeButtons]: pathname.includes(
            `sections/${sectionId}/lessons/${id}`,
          ),
        })}
      >
        <button
          className={cn(styles.buttonForLessonTab)}
          onClick={() => {
            handleDeleteLesson(id);
            setSections((state) => {
              return state.map((section) => {
                if (section.id === sectionId) {
                  return {
                    ...section,
                    lessons: section.lessons
                      .filter((lesson) => lesson.id !== id)
                      .map((lesson, index) => ({
                        ...lesson,
                        sequence: index + 1,
                      })),
                  };
                }
                return section;
              });
            });
          }}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}
