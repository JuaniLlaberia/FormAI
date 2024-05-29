import { FC, ReactElement } from 'react';

import { TextFieldFormElement } from '@/components/fields/TextField';
import { OptionsFieldFormElement } from '@/components/fields/OptionsField';
import { TitleFieldFormElement } from '@/components/fields/TitleField';
import { SubTitleFieldFormElement } from '@/components/fields/SubTitleField';
import { ParagraphFieldFormElement } from '@/components/fields/ParagraphField';
import { SeparatorFieldFormElement } from '@/components/fields/SeparatorField';
import { TextareaFieldFormElement } from '@/components/fields/TextareaField';
import { NumberFieldFormElement } from '@/components/fields/NumberField';
import { CheckboxFieldFormElement } from '@/components/fields/CheckboxField';
import { DateFieldFormElement } from '@/components/fields/DateField';

export type ElementsType =
  | 'TextField'
  | 'TitleField'
  | 'SubTitleField'
  | 'ParagraphField'
  | 'SeparatorField'
  | 'TextareaField'
  | 'NumberField'
  | 'CheckboxField'
  | 'DateField'
  | 'OptionsField';

export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;

  sidebarBtnElement: {
    icon: ReactElement;
    label: string;
  };

  designComponent: FC<{ elementInstance: FormElementInstance }>;
  formComponent: FC;
  propertiesComponent: FC<{ elementInstance: FormElementInstance }>;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TextareaField: TextareaFieldFormElement,
  NumberField: NumberFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
  DateField: DateFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  OptionsField: OptionsFieldFormElement,
};
