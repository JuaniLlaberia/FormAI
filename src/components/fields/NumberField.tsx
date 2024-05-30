'use client';

import { Hash } from 'lucide-react';
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
import { Switch } from '../ui/switch';
import RemoveFieldBtn from './(components)/RemoveFieldBtn';

const type: ElementsType = 'NumberField';

const extraAttributes = {
  label: 'Number field',
  helperText: 'Helper text',
  required: false,
  placeholder: 'Your number field',
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(20),
  helperText: z.string().optional(),
  required: z.boolean().default(false),
  placeholder: z.string().min(2).max(40),
});

export const NumberFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  sidebarBtnElement: {
    icon: <Hash />,
    label: 'Number field',
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
      <Label>{extraAtt.label}</Label>
      <Input
        required={extraAtt.required}
        placeholder={extraAtt.placeholder}
        readOnly
        type='number'
      />
      <p className='text-xs text-muted-foreground px-1'>
        {extraAtt.helperText ? extraAtt.helperText : null}
      </p>
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
  const { helperText, label, placeholder, required } = element.extraAttributes;

  const { updateElement } = useFormContext();
  const { register, handleSubmit, reset } = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label,
      helperText,
      placeholder,
      required,
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
        <Label htmlFor='label'>Label</Label>
        <Input
          id='label'
          className='mt-1'
          defaultValue={label}
          placeholder='Your label'
          onKeyDown={e => {
            if (e.key === 'Enter') e.currentTarget.blur();
          }}
          {...register('label')}
        />
        <p className='text-xs text-muted-foreground px-1 mt-1.5'>
          The label of the field. It will be display above the field.
        </p>
      </div>
      <div className='mb-2'>
        <Label htmlFor='placeholder'>Placeholder</Label>
        <Input
          id='placeholder'
          className='mt-1'
          defaultValue={placeholder}
          placeholder='Your placeholder'
          onKeyDown={e => {
            if (e.key === 'Enter') e.currentTarget.blur();
          }}
          {...register('placeholder')}
        />
        <p className='text-xs text-muted-foreground px-1 mt-1.5'>
          It helps the user know what information goes in this field.
        </p>
      </div>
      <div className='mb-2'>
        <Label htmlFor='helper-text'>Helper text</Label>
        <Input
          id='helper-text'
          className='mt-1'
          defaultValue={helperText}
          placeholder='Your helper text'
          onKeyDown={e => {
            if (e.key === 'Enter') e.currentTarget.blur();
          }}
          {...register('helperText')}
        />
        <p className='text-xs text-muted-foreground px-1 mt-1.5'>
          Extra indications you want to give the users. it will be display beloy
          the field.
        </p>
      </div>
      <div className='mb-2 flex flex-col gap-2 border border-border rounded-md mt-4 py-5 px-3'>
        <Label htmlFor='helper-text'>Required</Label>
        <div className='flex items-center'>
          <p className='text-xs text-muted-foreground pr-1'>
            Extra indications you want to give the users. it will be display
            beloy the field.
          </p>
          <Switch />
        </div>
      </div>
      <RemoveFieldBtn elementId={element.id} />
    </form>
  );
}
