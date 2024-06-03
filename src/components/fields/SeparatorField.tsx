'use client';

import { SeparatorHorizontal } from 'lucide-react';

import RemoveFieldBtn from './(components)/RemoveFieldBtn';
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from '@/app/dashboard/form/[formId]/edit/(components)/FormElements';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

const type: ElementsType = 'SeparatorField';

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  sidebarBtnElement: {
    icon: <SeparatorHorizontal />,
    label: 'Separator field',
  },

  designComponent: DesignComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

function DesignComponent() {
  return (
    <div className='flex flex-col w-full gap-2'>
      <Label className='text-sm text-muted-foreground'>Separator field</Label>
      <Separator />
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return <Separator />;
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return (
    <>
      <p className='text-center text-muted-foreground'>
        No properties for this element.
      </p>
      <RemoveFieldBtn elementId={elementInstance.id} />
    </>
  );
}
