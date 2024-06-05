'use client';

import {
  ArrowLeft,
  Brush,
  CircleAlert,
  LayoutTemplate,
  Loader,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import Radio from '@/components/ui/radio';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { FormValidator } from '@/validators';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createForm } from '@/actions/forms';
import { useToast } from '@/components/ui/use-toast';
import { ConfigureType } from '@prisma/client';

const FORM_OPTIONS = [
  {
    id: 'scratch',
    label: 'Scratch',
    description: 'Build using AI with full customization.',
    value: 'scratch',
    icon: <Brush className='size-5' />,
  },
  {
    id: 'templates',
    label: 'Templates',
    description: 'Use pre-build forms for quicker start.',
    value: 'templates',
    icon: <LayoutTemplate className='size-5' />,
  },
];

const CreateForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: { type: 'scratch', name: '', description: '' },
    resolver: zodResolver(FormValidator),
  });

  const { crrStep, nextStep, prevStep, isFirstStep, isLastStep } =
    useMultiStepForm([
      <>
        <Radio
          // @ts-ignore
          register={register}
          options={FORM_OPTIONS}
          fieldName='type'
          key='radio-step'
        />
        {errors.type?.message && (
          <p className='text-sm text-red-500 px-1 mb-3'>
            {errors.type?.message as string}
          </p>
        )}
      </>,
      <>
        <div className='mb-4'>
          <Label>Form name</Label>
          <Input
            {...register('name', {
              required: 'Must have a name',
            })}
            type='text'
            placeholder='e.g. School attendance'
            className='mb-1'
          />
          {errors.name?.message && (
            <p className='text-sm text-red-500 px-1'>
              {errors.name?.message as string}
            </p>
          )}
        </div>
        <div>
          <Label>Form description</Label>
          <Textarea
            className='h-[100px] resize-none'
            placeholder='Explanation, description for the visitors'
            {...register('description', {
              required: 'Must have a description',
            })}
          />
          {errors.description?.message && (
            <p className='text-sm text-red-500 px-1 mb-3'>
              {errors.description?.message as string}
            </p>
          )}
        </div>
      </>,
    ]);

  const hasFormsLeft = true;

  const { mutate: createFormFn, isPending } = useMutation({
    mutationKey: ['create-form'],
    mutationFn: createForm,
    onSuccess: id => {
      toast({
        title: 'Form created successfully',
        description: 'Now it is time to customize it.',
        variant: 'default',
      });
      router.push(`/dashboard/form/${id}/${getValues('type')}`);
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'We could not create the form. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = handleSubmit(data => {
    if (!isLastStep) return;

    createFormFn({
      name: data.name,
      description: data.description,
      configType: data.type as ConfigureType,
    });
  });

  return (
    <form
      onSubmit={
        isLastStep
          ? onSubmit
          : e => {
              e.preventDefault();
              nextStep();
            }
      }
    >
      {crrStep}
      <div>
        <Button
          disabled={!hasFormsLeft || isPending}
          className='w-full mt-7 mb-2'
        >
          {isPending ? <Loader className='size-4 animate-spin mr-1.5' /> : null}
          {!isLastStep ? 'Continue' : 'Finish'}
        </Button>
        {!isFirstStep && (
          <Button
            onClick={e => prevStep(e)}
            variant='ghost'
            className='w-full'
          >
            <ArrowLeft className='size-4 mr-1.5' />
            Go back
          </Button>
        )}
        {!hasFormsLeft && (
          <Alert variant='destructive'>
            <CircleAlert className='size-4' />
            <AlertTitle>You have no more forms</AlertTitle>
            <AlertDescription>
              You have reached the max. number of forms with the free tier.
              Upgrade to premium or delete one.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </form>
  );
};

export default CreateForm;
