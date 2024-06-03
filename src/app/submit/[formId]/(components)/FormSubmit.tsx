'use client';

import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, Loader, Send } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

import {
  FormElementInstance,
  FormElements,
} from '@/app/dashboard/form/[formId]/edit/(components)/FormElements';
import { Button, buttonVariants } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { submitForm as submitFormAction } from '@/actions/submissions';
import { Separator } from '@/components/ui/separator';

type FormSubmitProps = {
  formId: string;
  formContent: FormElementInstance[];
};

const FormSubmit = ({ formId, formContent }: FormSubmitProps) => {
  const { toast } = useToast();
  const { mutate: submitFormMutation, isPending } = useMutation({
    mutationKey: ['submit-form'],
    mutationFn: submitFormAction,

    onError: () =>
      toast({
        title: 'Failed to submit',
        description: 'We could not submit the form. Please try again.',
        variant: 'destructive',
      }),
  });

  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState<number>(new Date().getTime());
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validateForm: () => boolean = useCallback(() => {
    for (const field of formContent) {
      const actualValue = formValues.current[field.id] || '';
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [formContent]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: 'Invalid fields',
        description: 'Please check your answers before submitting again.',
        variant: 'destructive',
      });
      return;
    }

    const jsonContent = JSON.stringify(formValues.current);
    submitFormMutation(
      { formId, submittedContent: jsonContent },
      {
        onSuccess: () => {
          setIsSubmitted(true);
          toast({
            title: 'Form submitted',
            description: 'Your form was send successfully. Thank you!',
          });
        },
      }
    );
  };

  if (isSubmitted)
    return (
      <div className='flex flex-1 items-center justify-center'>
        <div className='flex flex-col flex-1 items-center justify-center'>
          <div className='max-w-[450px]'>
            <h2 className='text-center text-2xl lg:text-4xl font-semibold tracking-tight mb-2 lg:mb-4'>
              Form submitted 🎉
            </h2>
            <p className='text-muted-foreground lg:px-2'>
              You have submitted the form successfully. Thank you for
              submitting,{' '}
              <span className='text-primary font-medium'>
                you can close this page now
              </span>
              .
            </p>
            <Separator className='mt-6' />
            <div className='flex justify-between items-center mt-2'>
              <Link
                href='/'
                className={buttonVariants({ size: 'sm', variant: 'link' })}
              >
                <ArrowLeft className='mr-1.5 size-4' />
                Go Home
              </Link>
              <Link
                href='/dashboard'
                className={buttonVariants({ size: 'sm', variant: 'link' })}
              >
                Create Form <ArrowRight className='ml-1.5 size-4' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <div
        key={renderKey}
        className='bg-background-2 w-full max-w-[600px] min-h-[200px] rounded-md border border-border p-4 shadow-sm'
      >
        <div className='flex flex-col gap-4'>
          {formContent.map(elemement => {
            const FormElement = FormElements[elemement?.type].formComponent;

            return (
              <FormElement
                key={elemement.id}
                elementInstance={elemement}
                submitValue={submitValue}
                isInvalid={formErrors.current[elemement.id]}
                defaultValue={formValues.current[elemement.id]}
              />
            );
          })}
        </div>

        <Button
          disabled={isPending}
          className='w-full mt-8'
          onClick={e => {
            e.preventDefault();
            submitForm();
          }}
        >
          {isPending ? (
            <Loader className='size-4 mr-1.5 animate-spin' />
          ) : (
            <Send className='size-4 mr-1.5' />
          )}{' '}
          Submit form
        </Button>
      </div>
    </div>
  );
};

export default FormSubmit;
