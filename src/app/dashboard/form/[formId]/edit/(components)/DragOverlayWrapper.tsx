'use client';

import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement';
import { ElementsType, FormElements } from './FormElements';
import { useFormContext } from './FormContext';

const DragOverlayWrapper = () => {
  const { elements } = useFormContext();
  const [draggedItem, setDraggerItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: e => {
      setDraggerItem(e.active);
    },
    onDragCancel: () => {
      setDraggerItem(null);
    },
    onDragEnd: () => {
      setDraggerItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;
  const isSidebarBtnElement = draggedItem?.data?.current?.isSidebarBtn;

  if (isSidebarBtnElement)
    node = (
      <SidebarBtnElementDragOverlay
        formElement={
          FormElements[draggedItem?.data?.current?.type as ElementsType]
        }
      />
    );

  const isFormElement = draggedItem?.data?.current?.isFormElement;
  if (isFormElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find(el => el.id === elementId);
    if (!element) node = <div>Element not found</div>;
    else {
      const FormElementComponent = FormElements[element.type].designComponent;

      node = (
        <div className='flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer-events-none'>
          <FormElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
