'use client';
import { useCallback, useEffect, useState } from 'react';
import { Draggable, OnDragEndResponder } from '@hello-pangea/dnd';
import {
  useSectionsPatchSequences,
  useSectionCreate,
  useSectionDelete,
  useSectionsPatchTitle,
  useLessonDelete,
  useLessonsPatchSequences,
} from '@/hooks/courses';
import { DroppableProvider } from '@/app/providers/droppable.provider';
import styles from './sections-for-admin.module.css';
import { SectionsForAdminProps } from './sections-for-admin.props';
import { Button, SideUp } from '@/app/components/ui';
import { Section } from '@/app/components/pages';

export function SectionsForAdmin({
  sectionsWithLessons,
  courseId,
  paramsSectionId,
}: SectionsForAdminProps) {
  const [sections, setSections] = useState(sectionsWithLessons);
  const [isSuccessPatchTitleSection, setIsSuccessPatchTitleSection] =
    useState(false);
  const [errorPatchTitleSection, setErrorPatchTitleSection] = useState('');
  const [isSuccessPatchTitleLesson, setIsSuccessPatchTitleLesson] =
    useState(false);
  const [errorsPatchTitleLesson, setErrorPatchTitleLesson] = useState('');

  const handleSuccessPatchTitleSection = useCallback((isSuccess: boolean) => {
    setIsSuccessPatchTitleSection(isSuccess);

    if (isSuccess) {
      setTimeout(() => {
        setIsSuccessPatchTitleSection(false);
      }, 2000);
    }
  }, []);

  const handleErrorPatchTitleSection = useCallback((error: string) => {
    setErrorPatchTitleSection(error);

    if (error) {
      setTimeout(() => {
        setErrorPatchTitleSection('');
      }, 2000);
    }
  }, []);

  const handleSuccessPatchTitleLesson = useCallback((isSuccess: boolean) => {
    setIsSuccessPatchTitleLesson(isSuccess);

    if (isSuccess) {
      setTimeout(() => {
        setIsSuccessPatchTitleLesson(false);
      }, 2000);
    }
  }, []);

  const handleErrorPatchTitleLesson = useCallback((error: string) => {
    setErrorPatchTitleLesson(error);

    if (error) {
      setTimeout(() => {
        setErrorPatchTitleLesson('');
      }, 2000);
    }
  }, []);

  const {
    handlePatchSequences,
    isPending: isPendingPatchSequencesSection,
    isSuccess: isSuccessPatchSequencesSection,
    error: errorPatchSequencesSection,
  } = useSectionsPatchSequences();

  const {
    handleDeleteSection,
    isPending: isPendingDeleteSection,
    isSuccess: isSuccessDeleteSection,
    error: errorDeleteSection,
  } = useSectionDelete();

  const {
    handleCreateSection,
    isPending: isPendingCreateSection,
    isSuccess: isSuccessCreateSection,
    error: errorCreateSection,
    newSection,
  } = useSectionCreate();

  function moveSections({
    destination,
    source,
  }: {
    destination: { index: number; droppableId: string };
    source: { index: number; droppableId: string };
  }) {
    const newSections = sections.slice();
    const [sourceSection] = newSections.splice(source.index, 1);
    newSections.splice(destination.index, 0, sourceSection);
    newSections.map((section, index) => {
      section.sequence = index + 1;
      return section;
    });
    const patchSequences = newSections.map((section) => ({
      id: section.id,
      sequence: section.sequence,
    }));
    handlePatchSequences({ patch: patchSequences });
    setSections(newSections);
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
      source.droppableId === 'sections' &&
      destination.droppableId === 'sections'
    ) {
      moveSections({ destination, source });
    }
  };

  useEffect(() => {
    if (newSection) {
      const newState = [...sections, newSection];
      setSections(newState);
    }
  }, [newSection]);

  const {
    handlePatchSequences: handleLessonsPatchSequences,
    isPending: isPendingLessonsPatchSequences,
    isSuccess: isSuccessLessonsPatchSequences,
    error: errorLessonPatchSequences,
  } = useLessonsPatchSequences(courseId);

  const {
    handleDeleteLesson,
    isPending: isPendingDeleteLesson,
    isSuccess: isSuccessDeleteLesson,
    error: errorDeleteLesson,
  } = useLessonDelete(courseId);

  return (
    <div className={styles.sections}>
      <DroppableProvider onDragEnd={onDragEnd} droppableId="sections">
        {sections &&
          sections.map((section, index) => {
            return (
              <Draggable
                draggableId={'section-' + section.id}
                index={index}
                key={'section-' + section.id}
              >
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <Section
                      id={section.id}
                      paramsSectionId={paramsSectionId}
                      courseId={courseId}
                      key={section.id}
                      title={section.title}
                      sequence={index + 1}
                      lessons={section.lessons}
                      countSections={sections.length}
                      edit={true}
                      setSections={setSections}
                      provided={provided}
                      handleDeleteSection={handleDeleteSection}
                      handleSuccessPatchTitleSection={
                        handleSuccessPatchTitleSection
                      }
                      handleDeleteLesson={handleDeleteLesson}
                      handleLessonsPatchSequences={handleLessonsPatchSequences}
                      handleErrorPatchTitleSection={
                        handleErrorPatchTitleSection
                      }
                      handleSuccessPatchTitleLesson={
                        handleSuccessPatchTitleLesson
                      }
                      handleErrorPatchTitleLesson={handleErrorPatchTitleLesson}
                    />
                  </div>
                )}
              </Draggable>
            );
          })}
      </DroppableProvider>
      <Button
        appearance="primary"
        className={styles.addCourse}
        disabled={isPendingCreateSection}
        onClick={() => {
          handleCreateSection({ courseId, title: 'Новый раздел' });
        }}
      >
        Добавить раздел
      </Button>
      {isSuccessPatchSequencesSection && (
        <SideUp status="success">Порядок разделов успешно изменен</SideUp>
      )}
      {!!errorPatchSequencesSection && (
        <SideUp status="error">{errorPatchSequencesSection}</SideUp>
      )}
      {isSuccessCreateSection && (
        <SideUp status="success">Раздел успешно создан</SideUp>
      )}
      {!!errorCreateSection && (
        <SideUp status="error">{errorCreateSection}</SideUp>
      )}
      {isSuccessDeleteSection && (
        <SideUp status="success">Раздел успешно удален</SideUp>
      )}
      {!!errorDeleteSection && (
        <SideUp status="error">{errorDeleteSection}</SideUp>
      )}
      {isSuccessPatchTitleSection && (
        <SideUp status="success">Заголовок раздела успешно изменен</SideUp>
      )}
      {!!errorPatchTitleSection && (
        <SideUp status="error">{errorPatchTitleSection}</SideUp>
      )}
      {isSuccessDeleteLesson && (
        <SideUp status="success">Урок успешно удален</SideUp>
      )}
      {!!errorDeleteLesson && (
        <SideUp status="error">{errorDeleteLesson}</SideUp>
      )}
      {isSuccessLessonsPatchSequences && (
        <SideUp status="success">Порядок уроков успешно изменен</SideUp>
      )}
      {!!errorLessonPatchSequences && (
        <SideUp status="error">{errorLessonPatchSequences}</SideUp>
      )}
      {isSuccessPatchTitleLesson && (
        <SideUp status="success">Заголовок урока успешно изменен</SideUp>
      )}
      {!!errorsPatchTitleLesson && (
        <SideUp status="error">{errorPatchTitleSection}</SideUp>
      )}
    </div>
  );
}
