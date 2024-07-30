'use client';
import React, { useEffect, useState } from 'react';
import {
  SectionForAdminProps,
  SectionForUserProps,
  SectionProps,
} from './section.props';
import styles from './section.module.css';
import { Button, Htag, LessonTab } from '..';
import ArrowIcon from '../button/arrow.svg';
import cn from 'classnames';
import { Draggable, Droppable, OnDragEndResponder } from '@hello-pangea/dnd';
import { DroppableProvider } from '@/app/providers/droppable.provider';
import { DraggableProvider } from '@/app/providers/draggable.provider';

export function Section({
  id,
  courseId,
  title,
  sequence,
  lessonsStat,
  lessons,
  paramsSectionId,
  edit,
  setSections,
  provided,
}: SectionProps): JSX.Element {
  return (
    <>
      {edit && setSections && lessons && provided ? (
        <SectionForAdmin
          id={id}
          title={title}
          courseId={courseId}
          sequence={sequence}
          lessons={lessons}
          edit={edit}
          paramsSectionId={paramsSectionId}
          setSections={setSections}
          provided={provided}
        />
      ) : (
        <SectionForUser
          id={id}
          title={title}
          courseId={courseId}
          sequence={sequence}
          lessonsStat={lessonsStat}
          paramsSectionId={paramsSectionId}
        />
      )}
    </>
  );
}

function SectionForUser({
  title,
  id,
  courseId,
  sequence,
  lessonsStat,
  paramsSectionId,
}: SectionForUserProps): JSX.Element {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (paramsSectionId === id) {
      setOpened(true);
    }
  }, []);

  const handleClickButton = () => {
    setOpened(() => !opened);
  };

  return (
    <div className={cn(styles.sectionForUser)}>
      <button className={styles.title} onClick={handleClickButton}>
        <Htag tag="h3">
          {sequence}. {title}
        </Htag>
        <div
          className={cn(styles.arrow, {
            [styles.arrowDown]: opened === true,
          })}
        >
          <ArrowIcon />
        </div>
      </button>
      <div className={styles.lessons}>
        {lessonsStat ? (
          lessonsStat.map((lesson) => {
            return (
              <LessonTab
                id={lesson.id}
                sectionId={id}
                courseId={courseId}
                key={lesson.id}
                title={lesson.title}
                type={lesson.type}
                viewed={lesson.viewed}
                sequence={lesson.sequence}
                sectionSequence={sequence}
                opened={opened}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function SectionForAdmin({
  title,
  id,
  courseId,
  sequence,
  lessons,
  paramsSectionId,
  edit,
  setSections,
  provided,
}: SectionForAdminProps): JSX.Element {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (paramsSectionId === id) {
      setOpened(true);
    }
  }, []);

  const handleClickButton = () => {
    setOpened(() => !opened);
  };

  function moveLessons({
    destination,
    source,
  }: {
    destination: { index: number; droppableId: string };
    source: { index: number; droppableId: string };
  }) {
    const newLessons = lessons.slice();
    const [sourceLesson] = newLessons.splice(source.index, 1);
    newLessons.splice(destination.index, 0, sourceLesson);
    newLessons.map((lesson, index) => {
      lesson.sequence = index + 1;
      return lesson;
    });

    setSections((state) =>
      state.map((section) => {
        if (section.id === id) {
          return { ...section, lessons: newLessons };
        }
        return section;
      }),
    );
  }

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    if (
      source.droppableId === `lessons-${id}` &&
      destination.droppableId === `lessons-${id}`
    ) {
      moveLessons({ destination, source });
    }
  };
  return (
    <div className={cn(styles.sectionForAdmin)}>
      {/* Вместо div сделать input для название. С Sequence также будем играться через dnd. */}
      <div
        className={styles.contentForAdmin}
        onClick={handleClickButton}
        {...provided.dragHandleProps}
      >
        <div className={cn(styles.titleForAdmin)}>
          {sequence}. {title}
        </div>
        <div
          className={cn(styles.arrow, {
            [styles.arrowDown]: opened === true,
          })}
        >
          <ArrowIcon />
        </div>
      </div>

      <div className={styles.lessons}>
        {lessons ? (
          <DroppableProvider
            onDragEnd={onDragEnd}
            droppableId={'lessons-' + String(id)}
          >
            {lessons.map((lesson, index) => {
              return (
                <DraggableProvider
                  key={'lesson-' + lesson.id}
                  draggableId={String('lesson-' + lesson.id)}
                  index={index}
                >
                  <LessonTab
                    id={lesson.id}
                    sectionId={id}
                    courseId={courseId}
                    key={lesson.id}
                    title={lesson.title}
                    type={lesson.type}
                    sequence={index + 1}
                    sectionSequence={sequence}
                    opened={opened}
                    edit={edit}
                  />
                </DraggableProvider>
              );
            })}
          </DroppableProvider>
        ) : (
          <></>
        )}
        <Button
          appearance="primary"
          className={cn(styles.addLesson, {
            [styles.opened]: opened === true,
          })}
          disabled={false}
          onClick={() => {
            // handleCreateLesson({ courseId, title: 'Новый раздел' });
            console.log(lessons);
          }}
        >
          Добавить урок
        </Button>
      </div>
    </div>
  );
}
