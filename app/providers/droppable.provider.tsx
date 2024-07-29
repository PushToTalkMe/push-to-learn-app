'use client';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
  OnBeforeDragStartResponder,
  OnBeforeCaptureResponder,
  Direction,
} from '@hello-pangea/dnd';
import { ReactNode } from 'react';

export function DroppableProvider({
  children,
  onDragEnd,
  droppableId,
  direction = 'vertical',
}: {
  children: ReactNode;
  onDragEnd: OnDragEndResponder;
  droppableId: string;
  direction?: Direction;
}) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId} direction={direction}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
