'use client';
import {
  Htag,
  LessonTab,
  Progress,
  RightMenu,
  Section,
  SectionsForAdmin,
} from '@/app/components';
import { Loader } from '@/app/components/loader/loader';
import { idValidation } from '@/helpers/id-validation';
import { useCourseWithSectionsForEdit } from '@/hooks/courses';
import { useCoursesSectionsList } from '@/hooks/courses/use-courses-sections-list';
import { notFound } from 'next/navigation';
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { SectionWithLessons } from '@/api/generated';
import { DroppableProvider } from '@/app/providers/droppable.provider';
import { DraggableProvider } from '@/app/providers/draggable.provider';

export default function RootLayout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { courseId: string; sectionId: string };
}>) {
  if (
    !params.courseId ||
    !params.sectionId ||
    !idValidation(params.courseId) ||
    !idValidation(params.sectionId)
  ) {
    notFound();
  }
  const { course, isPending, isSuccess } = useCourseWithSectionsForEdit(
    +params.courseId,
  );

  return (
    <>
      {children}
      {isPending && <Loader />}
      {isSuccess && course && (
        <RightMenu
          expandedFromParent={true}
          title={<Htag tag="h1">Конструктор</Htag>}
          withoutButton={true}
        >
          <SectionsForAdmin
            courseId={course.id}
            sectionsWithLessons={course.sectionsWithLessons}
            paramsSectionId={+params.sectionId}
          />
        </RightMenu>
      )}
    </>
  );
}
