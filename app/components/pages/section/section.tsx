'use client';
import React, { useEffect, useRef, useState } from 'react';
import { OnDragEndResponder } from '@hello-pangea/dnd';
import { DroppableProvider } from '@/app/providers/droppable.provider';
import { DraggableProvider } from '@/app/providers/draggable.provider';
import {
  useSectionDelete,
  useSectionsPatchTitle,
  useLessonsPatchSequences,
} from '@/hooks/courses';
import {
  SectionForAdminProps,
  SectionForUserProps,
  SectionProps,
} from './section.props';
import styles from './section.module.css';
import cn from 'classnames';
import { Button, Htag, Popup, SideUp, Span } from '@/app/components/ui';
import { LessonsCreate, LessonTab } from '@/app/components/pages';
import { AngleDownIcon, AngleUpIcon, TrashIcon } from '@/public/icons';

export function Section({
  id,
  courseId,
  title,
  sequence,
  lessonsStat,
  lessons,
  countSections,
  paramsSectionId,
  edit,
  setSections,
  provided,
  handleDeleteSection,
  handleSuccessPatchTitleSection,
  handleDeleteLesson,
  handleLessonsPatchSequences,
  handleErrorPatchTitleSection,
  handleSuccessPatchTitleLesson,
  handleErrorPatchTitleLesson,
}: SectionProps): JSX.Element {
  return (
    <>
      {edit &&
      setSections &&
      lessons &&
      provided &&
      countSections &&
      handleDeleteSection &&
      handleSuccessPatchTitleSection &&
      handleDeleteLesson &&
      handleLessonsPatchSequences &&
      handleErrorPatchTitleSection &&
      handleErrorPatchTitleLesson &&
      handleSuccessPatchTitleLesson ? (
        <SectionForAdmin
          id={id}
          title={title}
          courseId={courseId}
          sequence={sequence}
          lessons={lessons}
          countSections={countSections}
          edit={edit}
          paramsSectionId={paramsSectionId}
          setSections={setSections}
          provided={provided}
          handleDeleteSection={handleDeleteSection}
          handleSuccessPatchTitleSection={handleSuccessPatchTitleSection}
          handleDeleteLesson={handleDeleteLesson}
          handleLessonsPatchSequences={handleLessonsPatchSequences}
          handleErrorPatchTitleSection={handleErrorPatchTitleSection}
          handleSuccessPatchTitleLesson={handleSuccessPatchTitleLesson}
          handleErrorPatchTitleLesson={handleErrorPatchTitleLesson}
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (paramsSectionId === id) {
      setOpen(true);
    }
  }, []);

  const handleClickButton = () => {
    setOpen(() => !open);
  };

  return (
    <div className={cn(styles.sectionForUser)}>
      <button className={styles.title} onClick={handleClickButton}>
        <Htag tag="h3">
          {sequence}. {title}
        </Htag>
        <div className={cn(styles.buttonForSectionTab)}>
          {open ? <AngleUpIcon /> : <AngleDownIcon />}
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
                opened={open}
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
  countSections,
  edit,
  setSections,
  provided,
  handleDeleteSection,
  handleSuccessPatchTitleSection,
  handleDeleteLesson,
  handleLessonsPatchSequences,
  handleErrorPatchTitleSection,
  handleSuccessPatchTitleLesson,
  handleErrorPatchTitleLesson,
}: SectionForAdminProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [createLesson, setCreateLesson] = useState(false);

  const {
    error: errorPatchTitleSection,
    isSuccess: isSuccessPatchTitleSection,
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useSectionsPatchTitle();

  const [titleSectionForInput] = watch(['titleSectionForInput']);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (paramsSectionId === id) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (isSuccessPatchTitleSection) {
      handleSuccessPatchTitleSection(isSuccessPatchTitleSection);
    }
  }, [isSuccessPatchTitleSection, handleSuccessPatchTitleSection]);

  useEffect(() => {
    if (errorPatchTitleSection) {
      handleErrorPatchTitleSection(errorPatchTitleSection);
    }
  }, [errorPatchTitleSection, handleErrorPatchTitleSection]);

  const handleClickButton = () => {
    setOpen(() => !open);
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
    handleLessonsPatchSequences(id, { patch: patchSequences });
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
                onBlur={(e) => handleSubmit(id)(e)}
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
              </form>
            </div>
          </div>
          <div className={cn(styles.buttons)}>
            <button
              className={cn(styles.buttonForSectionTab)}
              onClick={handleClickButton}
            >
              {open ? <AngleUpIcon /> : <AngleDownIcon />}
            </button>
            {countSections > 1 ? (
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
            ) : (
              <></>
            )}
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
                      countLessons={lessons.length}
                      sequence={index + 1}
                      sectionSequence={sequence}
                      opened={open}
                      edit={edit}
                      setSections={setSections}
                      handleDeleteLesson={handleDeleteLesson}
                      handleSuccessPatchTitleLesson={
                        handleSuccessPatchTitleLesson
                      }
                      handleErrorPatchTitleLesson={handleErrorPatchTitleLesson}
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
              [styles.opened]: open === true,
            })}
            disabled={false}
            onClick={() => {
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
