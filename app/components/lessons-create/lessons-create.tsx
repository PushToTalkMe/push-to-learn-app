'use client';
import { useEffect, useState } from 'react';
import { Button, Htag, P } from '..';
import { LessonCreateCard } from '../lesson-create-card/lesson-create-card';
import styles from './lessons-create.module.css';
import { LessonsCreateProps } from './lessons-create.props';
import { LessonStatType } from '@/api/generated';
import {
  DESCRIPTION_EXERCISE,
  DESCRIPTION_TEST,
  DESCRIPTION_THEORY,
} from './constants';
import { useLessonCreate } from '@/hooks/courses/use-lesson-create';

export function LessonsCreate({
  courseId,
  sectionId,
  setExpanded,
  setSections,
}: LessonsCreateProps) {
  const [lesson, setLesson] = useState<LessonStatType>('Theory');
  const { newLesson, handleCreateLesson, error, isPending, isSuccess } =
    useLessonCreate(courseId);

  useEffect(() => {
    if (isSuccess && newLesson) {
      setExpanded(false);
      setSections((state) => {
        return state.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              lessons: [
                ...section.lessons,
                {
                  id: newLesson.id,
                  title: newLesson.title,
                  sequence: newLesson.sequence,
                  sectionId: newLesson.sectionId,
                  type: newLesson.type,
                  createdAt: newLesson.createdAt,
                  updatedAt: newLesson.updatedAt,
                },
              ],
            };
          }
          return section;
        });
      });
    }
  }, [isSuccess]);
  return (
    <div className={styles.content}>
      <div>
        <Htag tag="h1">Выберите тип урока</Htag>
      </div>
      <div className={styles.lessonsCreate}>
        <LessonCreateCard type="Theory" setLesson={setLesson} lesson={lesson} />
        <LessonCreateCard type="Test" setLesson={setLesson} lesson={lesson} />
        <LessonCreateCard
          type="Exercise"
          setLesson={setLesson}
          lesson={lesson}
        />
      </div>
      <div className={styles.description}>
        {lesson === 'Theory' ? (
          <P size="large">{DESCRIPTION_THEORY}</P>
        ) : lesson === 'Test' ? (
          <P size="large">{DESCRIPTION_TEST}</P>
        ) : lesson === 'Exercise' ? (
          <P size="large">{DESCRIPTION_EXERCISE}</P>
        ) : (
          <></>
        )}
      </div>
      <Button
        appearance="primary"
        className={styles.button}
        onClick={() =>
          handleCreateLesson({ type: lesson, sectionId: sectionId })
        }
      >
        Выбрать
      </Button>
    </div>
  );
}
