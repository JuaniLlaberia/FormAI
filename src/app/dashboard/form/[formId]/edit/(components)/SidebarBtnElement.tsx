'use client';

import { useDraggable } from '@dnd-kit/core';

import { Button } from '@/components/ui/button';
import { FormElement } from './FormElements';
import { cn } from '@/lib/utils';

const SidebarBtnElement = ({ formElement }: { formElement: FormElement }) => {
  const { label, icon } = formElement.sidebarBtnElement;
  const draggable = useDraggable({
    id: `sidebar-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isSidebarBtn: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      className={cn(
        'flex flex-col gap-2  size-[120px] cursor-grab',
        draggable.isDragging && 'ring-2 ring-primary'
      )}
      variant='outline'
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <span>{icon}</span>
      <p>{label}</p>
    </Button>
  );
};

export const SidebarBtnElementDragOverlay = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon } = formElement.sidebarBtnElement;

  return (
    <Button
      className='flex flex-col gap-2  size-[120px] cursor-grab'
      variant='outline'
    >
      <span>{icon}</span>
      <p>{label}</p>
    </Button>
  );
};

export default SidebarBtnElement;
