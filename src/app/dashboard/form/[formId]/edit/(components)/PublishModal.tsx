'use client';

import { AlertCircle, Loader, Send } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { publishForm as publishFormAction } from '@/actions/forms';
import { useFormContext } from './FormContext';

const PublishModal = ({ formId }: { formId: string }) => {
  const { elements } = useFormContext();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: publishForm, isPending } = useMutation({
    mutationKey: ['publish-form'],
    mutationFn: publishFormAction,
    onSuccess: () => {
      toast({
        title: 'Form published successfully',
        description: 'Now you can start collecting information.',
      });
      router.push(`/dashboard/form/${formId}/published`);
    },
    onError: () =>
      toast({
        title: 'Failed to publish form',
        description: 'Something went wrong when publishing. Please try again.',
        variant: 'destructive',
      }),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size='sm'
          className='text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:opacity-90'
        >
          <Send className='size-4 mr-1.5' />
          Publish
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Publish form</DialogTitle>
        <DialogDescription>
          Once you have published your form you cannot edit it. Users will be
          able to submit and you can start gathering information.{' '}
          <span className='text-primary font-medium'>
            It will be visible for the public.
          </span>
        </DialogDescription>
        <Alert className='mt-2.5'>
          <AlertCircle className='size-4' />
          <AlertTitle>This action in irreversible</AlertTitle>
        </Alert>
        <div className='flex justify-between mt-2'>
          <DialogClose asChild>
            <Button
              disabled={isPending}
              size='sm'
              variant='ghost'
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isPending}
            size='sm'
            onClick={() =>
              publishForm({ formId, content: JSON.stringify(elements) })
            }
          >
            {isPending && <Loader className='size-4 mr-1.5 animate-spin' />}
            Publish
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PublishModal;
