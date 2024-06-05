'use client';

import { SquareCheck, Type } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from '@/app/dashboard/form/[formId]/edit/(components)/FormElements';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useFormContext } from '@/app/dashboard/form/[formId]/edit/(components)/FormContext';
import { Switch } from '../ui/switch';
import { Checkbox } from '../ui/checkbox';
import RemoveFieldBtn from './(components)/RemoveFieldBtn';
import { cn } from '@/lib/utils';

const type: ElementsType = 'CheckboxField';

const extraAttributes = {
  label: 'Checkbox field',
  helperText: 'Helper text',
  required: false,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(20),
  helperText: z.string().optional(),
  required: z.boolean().default(false),
});

export const CheckboxFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  sidebarBtnElement: {
    icon: <SquareCheck />,
    label: 'Checkbox field',
  },

  designComponent: DesignComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue === 'true';
    }

    return true;
  },
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

  const id = `checkbox-${element.id}`;

  return (
    <div
      id={id}
      className='flex flex-col w-full gap-2'
    >
      <div className='flex items-start gap-2.5'>
        <Checkbox />
        <div className='flex flex-col gap-1'>
          <Label htmlFor={id}>{extraAtt.label}</Label>
          <p className='text-xs text-muted-foreground'>
            {extraAtt.helperText ? extraAtt.helperText : null}
          </p>
        </div>
      </div>
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;

  const [value, setValue] = useState<boolean>(
    defaultValue === 'true' ? true : false
  );
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const id = `checkbox-${element.id}`;

  return (
    <div
      id={id}
      className='flex flex-col w-full gap-2'
    >
      <div className='flex items-start gap-2.5'>
        <Checkbox
          checked={value}
          onCheckedChange={checked => {
            let val = false;
            if (checked === true) val = true;

            setValue(val);
            if (!submitValue) return;

            const stringVal = val ? 'true' : 'false';
            const valid = CheckboxFieldFormElement.validate(element, stringVal);

            setError(!valid);
            submitValue(element.id, stringVal);
          }}
          className={cn(error && 'border-red-500')}
        />
        <div className='flex flex-col gap-1'>
          <Label
            htmlFor={id}
            className={cn(error && 'text-red-500')}
          >
            {element.extraAttributes.label}
          </Label>
          <p
            className={cn(
              'text-xs px-1',
              error ? 'text-red-500' : 'text-muted-foreground'
            )}
          >
            {element.extraAttributes.helperText
              ? element.extraAttributes.helperText
              : null}
          </p>
        </div>
      </div>
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
  const { helperText, label, required } = element.extraAttributes;

  const { updateElement } = useFormContext();
  const { register, handleSubmit, reset, setValue, getValues, watch } =
    useForm<propertiesFormSchemaType>({
      resolver: zodResolver(propertiesSchema),
      mode: 'onBlur',
      defaultValues: {
        label,
        helperText,
        required,
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
          <Switch
            onClick={() => {
              setValue('required', !getValues('required'));
            }}
            checked={watch('required')}
          />
        </div>
      </div>
      <RemoveFieldBtn elementId={element.id} />
    </form>
  );
}
