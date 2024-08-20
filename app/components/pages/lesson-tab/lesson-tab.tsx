'use client';
import React, { useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLessonDelete, useLessonPatchTitle } from '@/hooks/courses';
import {
  LessonTabForAdminProps,
  LessonTabForUserProps,
  LessonTabProps,
} from './lesson-tab.props';
import styles from './lesson-tab.module.css';
import cn from 'classnames';
import { P, Span } from '@/app/components/ui';
import { ROUTES } from '@/constants/routes';
import {
  TestMiniIcon,
  TheoryMiniIcon,
  ExerciseMiniIcon,
  TrashIcon,
} from '@/public/icons';

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
            <ExerciseMiniIcon />
          </div>
        )}
        {type === 'Theory' && (
          <div className={cn(styles.icon)}>
            <TheoryMiniIcon />
          </div>
        )}
        {type === 'Test' && (
          <div className={cn(styles.icon)}>
            <TestMiniIcon />
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
  const inputRef = useRef<HTMLInputElement | null>(null);

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
        className={cn(styles.titleAndType, styles.editTitleAndType, {
          [styles.active]: pathname.includes(
            `sections/${sectionId}/lessons/${id}`,
          ),
        })}
        onClick={handleClickButton}
      >
        <div className={cn(styles.title)}>
          {sectionSequence}.{sequence}
          {'\u00A0'}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputRef.current) {
                inputRef.current.blur();
              }
            }}
            onBlur={handleSubmit}
          >
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
                required: 'Введите заголовок для урокаы',
              })}
              ref={(e) => {
                inputRef.current = e;
                return register('titleLessonForInput').ref(e);
              }}
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
            <ExerciseMiniIcon />
          </div>
        )}
        {type === 'Theory' && (
          <div className={cn(styles.icon)}>
            <TheoryMiniIcon />
          </div>
        )}
        {type === 'Test' && (
          <div className={cn(styles.icon)}>
            <TestMiniIcon />
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
