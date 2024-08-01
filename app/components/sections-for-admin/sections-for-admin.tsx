'use client';
import styles from './sections-for-admin.module.css';
import { DroppableProvider } from '@/app/providers/droppable.provider';
import { Section } from '../section/section';
import { SectionsForAdminProps } from './sections-for-admin.props';
import { useEffect, useState } from 'react';
import { Draggable, OnDragEndResponder } from '@hello-pangea/dnd';
import { Button } from '../button/button';
import { useSectionsPatchSequences } from '@/hooks/courses/use-sections-patch-sequences';
import { useSectionCreate } from '@/hooks/courses/use-section-create';

export function SectionsForAdmin({
  sectionsWithLessons,
  courseId,
  paramsSectionId,
}: SectionsForAdminProps) {
  const [sections, setSections] = useState(sectionsWithLessons);

  const { handlePatchSequences, isPending, isSuccess, error } =
    useSectionsPatchSequences();

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
    if (errorCreateSection || error) {
      alert(`Не удалось сохранить изменения на сервере.${error}`);
    }
    if (newSection) {
      const newState = [...sections, { ...newSection, lessons: [] }];
      setSections(newState);
    }
  }, [errorCreateSection, error, newSection]);

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
                      edit={true}
                      setSections={setSections}
                      provided={provided}
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
    </div>
  );
}
