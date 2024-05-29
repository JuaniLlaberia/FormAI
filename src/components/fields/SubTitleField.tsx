'use client';

import { Heading2 } from 'lucide-react';
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
import { Input } from '../ui/input';
import { useFormContext } from '@/app/dashboard/form/[formId]/edit/(components)/FormContext';

const type: ElementsType = 'SubTitleField';

const extraAttributes = {
  title: 'Subtitle field',
};

const propertiesSchema = z.object({
  title: z.string().min(2).max(20),
});

export const SubTitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  sidebarBtnElement: {
    icon: <Heading2 />,
    label: 'Subtitle field',
  },

  designComponent: DesignComponent,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: PropertiesComponent,
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
      <Label className='text-sm text-muted-foreground'>Subtitle field</Label>
      <h3 className='text-base'>{extraAtt.title}</h3>
    </div>
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;

  const { updateElement } = useFormContext();
  const { register, handleSubmit, reset } = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      title,
    },
  });

  useEffect(() => {
    reset(element.extraAttributes);
  }, [element]);

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
        <Label htmlFor='sub-title'>Subtitle</Label>
        <Input
          id='sub-title'
          className='mt-1'
          defaultValue={title}
          placeholder='Your subtitle'
          onKeyDown={e => {
            if (e.key === 'Enter') e.currentTarget.blur();
          }}
          {...register('title')}
        />
        <p className='text-xs text-muted-foreground px-1 mt-1.5'>
          UI component to display a subtitle to users.
        </p>
      </div>
    </form>
  );
}
