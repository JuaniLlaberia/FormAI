'use client';

import { useMutation } from '@tanstack/react-query';
import { AlertCircle, Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { deleteForm } from '@/actions/forms';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const DeleteFormModal = ({
  formId,
  formName,
}: {
  formId: string;
  formName: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: removeForm, isPending } = useMutation({
    mutationKey: ['delete-form'],
    mutationFn: deleteForm,
    onSuccess: () => {
      router.push('/dashboard');
      toast({
        title: 'Form deleted successfully',
        description: 'All data related to this form was deleted.',
      });
    },
    onError: () =>
      toast({
        title: 'Failed to delete form',
        description: 'We could not delate your form. Please try again.',
        variant: 'destructive',
      }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(() => {
    removeForm({ formId });
  });

  return (
    <>
      <DialogTitle>Delete form</DialogTitle>
      <DialogDescription>
        You are about to delete <span className='text-primary'>{formName}</span>{' '}
        form. All data related will be deleted including submissions.
      </DialogDescription>
      <form
        onSubmit={onSubmit}
        className='flex flex-col gap-4'
      >
        <div>
          <label
            htmlFor='name'
            className='text-sm text-muted-foreground mb-1.5'
          >
            Enter the form name{' '}
            <span className='text-primary font-semibold'>{formName}</span> to
            continue:
          </label>
          <Input
            id='name'
            type='text'
            {...register('name', {
              validate: {
                validator: fieldVal =>
                  fieldVal === formName ? true : 'Please confirm form name',
              },
            })}
          />
          {errors.name?.message ? (
            <p className='text-sm text-red-500 px-1'>
              {errors.name?.message as string}
            </p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor='confirm'
            className='text-sm text-muted-foreground mb-1.5'
          >
            To confirm, type{' '}
            <span className='text-primary font-semibold'>delete my form</span>{' '}
            below:
          </label>
          <Input
            id='confirm'
            type='text'
            {...register('confirm', {
              validate: {
                validator: fieldVal =>
                  fieldVal === 'delete my form'
                    ? true
                    : 'Please confirm in order to continue',
              },
            })}
          />
          {errors.confirm?.message ? (
            <p className='text-sm text-red-500 px-1'>
              {errors.confirm?.message as string}
            </p>
          ) : null}
        </div>
        <Alert variant='destructive'>
          <AlertCircle className='size-4' />
          <AlertTitle>Warning. This action is not reversible</AlertTitle>
        </Alert>
        <div className='flex justify-between mt-2'>
          <DialogClose asChild>
            <Button
              disabled={isPending}
              variant='outline'
              size='sm'
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isPending}
            size='sm'
          >
            {isPending ? (
              <Loader className='size-4 mr-1.5 animate-spin' />
            ) : null}
            Confirm
          </Button>
        </div>
      </form>
    </>
  );
};

export default DeleteFormModal;
