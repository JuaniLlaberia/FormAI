'use client';

import { CaseSensitive } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from '@/app/dashboard/form/[formId]/edit/(components)/FormElements';
import { Label } from '../ui/label';
import { useFormContext } from '@/app/dashboard/form/[formId]/edit/(components)/FormContext';
import { Textarea } from '../ui/textarea';
import RemoveFieldBtn from './(components)/RemoveFieldBtn';

const type: ElementsType = 'ParagraphField';

const extraAttributes = {
  text: 'Paragraph field',
};

const propertiesSchema = z.object({
  text: z.string().min(2).max(75),
});

export const ParagraphFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  sidebarBtnElement: {
    icon: <CaseSensitive />,
    label: 'Paragraph field',
  },

  designComponent: DesignComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const extraAtt = element.extraAttributes;

  return (
    <div className='flex flex-col w-full gap-2'>
      <Label className='text-sm text-muted-foreground'>Paragraph field</Label>
      <p className='text-sm'>{extraAtt.text}</p>
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { text } = element.extraAttributes;
  return <p className='text-muted-foreground'>{text}</p>;
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { text } = element.extraAttributes;

  const { updateElement } = useFormContext();
  const { register, handleSubmit, reset } = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      text,
    },
  });

  useEffect(() => {
    reset(element.extraAttributes);
  }, [element, reset]);

  const applyChanges = (values: propertiesFormSchemaType) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...values,
      },
    });
  };

  return (
    <form
      onSubmit={e => e.preventDefault()}
      onBlur={handleSubmit(applyChanges)}
    >
      <div className='mb-2'>
        <Label htmlFor='paragraph'>Paragraph</Label>
        <Textarea
          id='paragraph'
          className='mt-1'
          defaultValue={text}
          placeholder='Your paragraph'
          onKeyDown={e => {
            if (e.key === 'Enter') e.currentTarget.blur();
          }}
          {...register('text')}
        />
        <p className='text-xs text-muted-foreground px-1 mt-1.5'>
          Add a description/paragraph.
        </p>
      </div>
      <RemoveFieldBtn elementId={element.id} />
    </form>
  );
}
