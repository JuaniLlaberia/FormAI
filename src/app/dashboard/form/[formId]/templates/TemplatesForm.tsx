'use client';

import { useMutation } from '@tanstack/react-query';
import { AlertCircle, Info, Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import Radio from '@/components/ui/radio';
import { updateForm } from '@/actions/forms';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

const TEMPLATES = [
  {
    id: 'contact',
    label: 'Contact',
    description:
      'Ideal to collect contact information or allow them to contact your.',
    value: 'contact',
  },
  {
    id: 'feedback',
    label: 'Feedback',
    description: 'Receive feedback about a course, product, class, etc.',
    value: 'feedback',
  },
  // {
  //   id: 'registration',
  //   label: 'Registration',
  //   description: 'Organize users with common information.',
  //   value: 'registration',
  // },
];

const TEMPLATES_FIELDS_JSON = {
  contact: {
    formFields: [
      {
        name: 'fullName',
        placeholder: 'Enter your full name',
        label: 'Full Name',
      },
      { name: 'email', placeholder: 'Enter your email', label: 'Email' },
      {
        name: 'phone',
        placeholder: 'Enter your phone number',
        label: 'Phone Number',
      },
      {
        name: 'comment',
        placeholder: 'Extra comments',
        label: 'Extra comments',
      },
    ],
  },
  feedback: {
    formFields: [
      { name: 'email', placeholder: 'Enter your email', label: 'Email' },
      {
        name: 'phone',
        placeholder: 'Enter your phone number',
        label: 'Phone Number',
      },
      {
        name: 'feedback',
        placeholder: 'Write your feedback here',
        label: 'Feedback',
      },
    ],
  },
};

const TemplatesForm = ({ formId }: { formId: string }) => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: updateFormFn, isPending } = useMutation({
    mutationKey: ['update-form'],
    mutationFn: updateForm,
    onSuccess: () => {
      router.push(`/dashboard/form/${formId}/edit`);
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description:
          'We failed to finish creating your form. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = handleSubmit(data => {
    if (!data.template) return;

    updateFormFn({
      formId,
      formData: {
        // @ts-ignore
        content: JSON.stringify(TEMPLATES_FIELDS_JSON[data.template]),
        needsConfigure: false,
      },
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Radio register={register} fieldName='template' options={TEMPLATES} />
      <Alert className='mb-3 text-muted-foreground'>
        <Info className='size-4 text-muted-foreground' />
        <AlertTitle>More comming soon</AlertTitle>
      </Alert>
      <Button className='w-full' disabled={isPending}>
        {isPending && <Loader className='size-4 mr-1.5 animate-spin' />}
        Finish
      </Button>
      {errors.template?.message ? (
        <p className='flex items-center text-sm text-red-500 px-1 mt-1.5'>
          <AlertCircle className='size-3.5 mr-1.5' />
          {errors.template?.message as string}
        </p>
      ) : null}
    </form>
  );
};

export default TemplatesForm;
