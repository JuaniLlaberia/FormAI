'use client';

import { Form as FormType } from '@prisma/client';
import { Eye, Save, Send, Settings } from 'lucide-react';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import Form from './Form';
import Sidebar from './Sidebar';
import DragOverlayWrapper from './DragOverlayWrapper';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useFormContext } from './FormContext';
import { updateForm as updateFormAction } from '@/actions/forms';

const FormEditor = ({ form }: { form: FormType }) => {
  const { setElements, setSelectedElement, elements } = useFormContext();
  const [isReady, setIsReady] = useState<boolean>(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const { mutate: updateForm } = useMutation({
    mutationKey: ['update-form'],
    mutationFn: updateFormAction,
  });

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
    setElements(elements.inputs || elements);
    setSelectedElement(null);
    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [form, setElements, isReady, setSelectedElement]);

  return (
    <DndContext sensors={sensors}>
      <div className='flex flex-col w-full flex-1'>
        <div className='flex justify-between p-2 gap-3 items-center mb-3'>
          <input
            onBlur={e => {
              updateFormAction({
                formId: form.id,
                formData: { name: e.target.value },
              });
            }}
            className='text-xl lg:text-2xl tracking-tight font-semibold bg-transparent outline-none ring-none'
            defaultValue={form.name}
          />
          <div className='flex items-center gap-2'>
            <Button
              size='sm'
              className='hidden md:flex'
              variant='ghost'
            >
              <Eye className='size-4 mr-1.5' />
              Preview
            </Button>
            <Button
              size='sm'
              className='hidden md:flex'
              variant='ghost'
              onClick={() => {
                updateForm({
                  formId: form.id,
                  formData: { content: JSON.stringify(elements) },
                });
              }}
            >
              <Save className='size-4 mr-1.5' />
              Save
            </Button>
            <Button
              size='sm'
              className='hidden md:flex'
            >
              <Send className='size-4 mr-1.5' />
              Publish
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className='flex md:hidden'
              >
                <Button
                  size='icon'
                  variant='ghost'
                >
                  <Settings className='size-5' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Eye className='size-4 mr-2.5' /> Preview
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Save className='size-4 mr-2.5' /> Save
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Send className='size-4 mr-2.5' /> Publish
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className='flex flex-1 gap-2 md:gap-3 lg:gap-4 xl:gap-5'>
          <Form />
          <Sidebar />
        </div>
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormEditor;
