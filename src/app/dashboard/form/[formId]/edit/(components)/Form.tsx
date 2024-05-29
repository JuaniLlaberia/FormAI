'use client';

import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { useFormContext } from './FormContext';
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from './FormElements';

const Form = () => {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useFormContext();
  const droppable = useDroppable({
    id: 'form-drop-area',
    data: {
      isFormDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (e: DragEndEvent) => {
      const { active, over } = e;
      if (!active || !over) return;

      const isSidebarBtnElement = active?.data?.current?.isSidebarBtn;
      const isDroppingOverFormDropArea = over?.data?.current?.isFormDropArea;

      if (isSidebarBtnElement && isDroppingOverFormDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          Math.floor(Math.random() * 10001).toString()
        );

        addElement(elements.length, newElement);
        return;
      }

      const isDroppingOverFormElementTopHalf =
        over?.data?.current?.isTopHalfDesignerElement;
      const isDroppingOverFormElementBottomHalf =
        over?.data?.current?.isBottomHalfDesignerElement;

      if (
        isSidebarBtnElement &&
        (isDroppingOverFormElementTopHalf ||
          isDroppingOverFormElementBottomHalf)
      ) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          Math.floor(Math.random() * 10001).toString()
        );

        const overId = over?.data?.current?.elementId;

        const overElementIndex = elements.findIndex(el => el.id === overId);
        if (overElementIndex === -1) throw new Error('Element not found');

        let index = overElementIndex;
        if (isDroppingOverFormElementBottomHalf) index = overElementIndex + 1;

        addElement(index, newElement);
        return;
      }

      const isDraggingFormElement = active?.data?.current?.isFormElement;
      const draggingElementOverAnotherElement =
        (isDroppingOverFormElementTopHalf ||
          isDroppingOverFormElementBottomHalf) &&
        isDraggingFormElement;

      if (draggingElementOverAnotherElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(el => el.id === activeId);
        const overElementIndex = elements.findIndex(el => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1)
          throw new Error('Element not found');

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let newIndex = overElementIndex;
        if (isDroppingOverFormElementBottomHalf)
          newIndex = overElementIndex + 1;

        addElement(newIndex, activeElement);
      }
    },
  });

  return (
    <div
      onClick={() => {
        if (selectedElement) setSelectedElement(null);
      }}
      ref={droppable.setNodeRef}
      className={cn(
        'flex w-full flex-1 flex-grow items-center justify-center bg-background-2 border border-border rounded-md',
        droppable.isOver && 'ring-2 ring-primary/30'
      )}
    >
      <div className='h-full w-full flex flex-col items-center justify-start p-2.5'>
        {!droppable.isOver && elements?.length === 0 ? (
          <p className='text-xl text-muted-foreground flex flex-grow items-center'>
            Drop here
          </p>
        ) : null}
        {elements?.length > 0 ? (
          <div className='flex flex-col w-full gap-2 p-3'>
            {elements.map(element => (
              <FormElementWrapper
                key={element.id}
                element={element}
              />
            ))}
          </div>
        ) : null}
        {droppable.isOver && elements?.length === 0 ? (
          <div className='h-[120px] w-full rounded-md bg-primary/25' />
        ) : null}
      </div>
    </div>
  );
};

function FormElementWrapper({ element }: { element: FormElementInstance }) {
  const { setSelectedElement } = useFormContext();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isFormElement: true,
    },
  });

  if (draggable.isDragging) return null;

  const Component = FormElements[element.type].designComponent;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={e => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
      className='relative overflow-hidden h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset'
    >
      <div
        ref={topHalf.setNodeRef}
        className='absolute w-full h-1/2 rounded-t-md'
      />
      <div
        ref={bottomHalf.setNodeRef}
        className='absolute bottom-0 w-full h-1/2 rounded-b-md'
      />
      {mouseIsOver ? (
        <>
          <div className='absolute flex justify-center w-full h-full items-center'>
            <p className='text-sm text-muted-foreground'>Click to edit</p>
          </div>
        </>
      ) : null}
      {topHalf.isOver && (
        <div className='absolute top-0 w-full rounded-t-md h-[7px] bg-primary/75 animate-pulse transition-colors' />
      )}
      <div
        className={cn(
          'flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none',
          mouseIsOver ? 'opacity-30' : 'opacity-100'
        )}
      >
        <Component elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className='absolute bottom-0 w-full rounded-b-md h-[7px] bg-primary/75 animate-pulse transition-colors' />
      )}
    </div>
  );
}

export default Form;
