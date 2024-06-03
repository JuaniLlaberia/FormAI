'use client';

import { Form as FormType } from '@prisma/client';
import { Eye, Loader, Save, Send, Settings } from 'lucide-react';
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
import PublishModal from './PublishModal';
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
import { useToast } from '@/components/ui/use-toast';

const FormEditor = ({ form }: { form: FormType }) => {
  const { toast } = useToast();
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

  const { mutate: updateForm, isPending } = useMutation({
    mutationKey: ['update-form'],
    mutationFn: updateFormAction,
    onSuccess: () =>
      toast({
        title: 'Form updated successfully',
        description: 'The form was updated and save.',
      }),
    onError: () =>
      toast({
        title: 'Something went wrong',
        description:
          'We failed to update and save your changes. Please try again.',
        variant: 'destructive',
      }),
  });

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
    setElements(
      elements.form || elements.input || elements.formFields || elements
    );
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
              disabled={isPending}
              onClick={() => {
                updateForm({
                  formId: form.id,
                  formData: { content: JSON.stringify(elements) },
                });
              }}
            >
              <Save className='size-4 mr-1.5' />
              Save
              {isPending && <Loader className='size-4 ml-1.5 animate-spin' />}
            </Button>
            <PublishModal formId={form.id} />
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
                <DropdownMenuItem
                  onClick={() => {
                    updateForm({
                      formId: form.id,
                      formData: { content: JSON.stringify(elements) },
                    });
                  }}
                >
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
