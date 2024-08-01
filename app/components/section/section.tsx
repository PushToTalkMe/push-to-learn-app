'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  SectionForAdminProps,
  SectionForUserProps,
  SectionProps,
} from './section.props';
import styles from './section.module.css';
import { Button, Htag, LessonsCreate, LessonTab, Popup, Span } from '..';
import AngleDown from '@/public/icons/angle-down.svg';
import AngleUp from '@/public/icons/angle-up.svg';
import TrashIcon from '@/public/icons/trash.svg';
import cn from 'classnames';
import { Draggable, Droppable, OnDragEndResponder } from '@hello-pangea/dnd';
import { DroppableProvider } from '@/app/providers/droppable.provider';
import { DraggableProvider } from '@/app/providers/draggable.provider';
import { useSectionDelete } from '@/hooks/courses/use-section-delete';
import { useSectionsPatchTitle } from '@/hooks/courses/use-section-patch-title';
import { useLessonsPatchSequences } from '@/hooks/courses/use-lessons-patch-sequences copy';

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
        <div className={cn(styles.buttonForSectionTab)}>
          {opened ? <AngleUp /> : <AngleDown />}
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
  const [createLesson, setCreateLesson] = useState(false);

  const {
    handlePatchSequences,
    isPending: isPendingLessonsPatchSequences,
    isSuccess: isSuccessLessonsPatchSequences,
    error: errorLessonPatchSequences,
  } = useLessonsPatchSequences(courseId, id);

  const {
    error: errorPatchTitle,
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useSectionsPatchTitle(id);

  const [titleSectionForInput] = watch(['titleSectionForInput']);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { handleDeleteSection, isPending, isSuccess, error } =
    useSectionDelete();

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
    const patchSequences = newLessons.map((lessons) => ({
      id: lessons.id,
      sequence: lessons.sequence,
    }));
    handlePatchSequences({ patch: patchSequences });
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
    <>
      {createLesson ? (
        <Popup
          setExpanded={setCreateLesson}
          background="body"
          createLessons={true}
        >
          <LessonsCreate
            courseId={courseId}
            sectionId={id}
            setExpanded={setCreateLesson}
            setSections={setSections}
          />
        </Popup>
      ) : null}
      <div className={cn(styles.sectionForAdmin)}>
        <div className={cn(styles.sectionTab)}>
          <div className={styles.contentForAdmin} {...provided.dragHandleProps}>
            <div className={cn(styles.titleForAdmin)}>
              {sequence}.{'\u00A0'}
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
                  className={cn(styles.inputForSection)}
                  type="text"
                  defaultValue={title}
                  maxLength={20}
                  placeholder="Заголовок"
                  {...register('titleSectionForInput', {
                    required: 'Введите заголовок для раздела',
                  })}
                  ref={(e) => {
                    inputRef.current = e;
                    return register('titleSectionForInput').ref(e);
                  }}
                />
                {errors && (
                  <Span className={styles.errorInput}>
                    {errors.titleSectionForInput?.message}
                  </Span>
                )}
                {errorPatchTitle && (
                  <Span className={styles.errorInput}>{errorPatchTitle}</Span>
                )}
              </form>
            </div>
          </div>
          <div className={cn(styles.buttons)}>
            <button
              className={cn(styles.buttonForSectionTab)}
              onClick={handleClickButton}
            >
              {opened ? <AngleUp /> : <AngleDown />}
            </button>
            <button
              className={cn(styles.buttonForSectionTab)}
              onClick={() => {
                handleDeleteSection(id);
                setSections((state) =>
                  state.filter((section) => section.id !== id),
                );
              }}
            >
              <TrashIcon />
            </button>
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
                      setSections={setSections}
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
              // handleCreateLesson({ sectionId, title: 'Новый раздел', data, type: Theory || Test || Exercise });
              setCreateLesson(true);
            }}
          >
            Добавить урок
          </Button>
        </div>
      </div>
    </>
  );
}
