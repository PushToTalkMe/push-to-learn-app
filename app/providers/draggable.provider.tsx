'use client';
import { Draggable } from '@hello-pangea/dnd';
import { ReactNode } from 'react';

export function DraggableProvider({
  children,
  draggableId,
  index,
}: {
  children: ReactNode;
  draggableId: string;
  index: number;
}) {
  return (
    <Draggable key={draggableId} draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
}
