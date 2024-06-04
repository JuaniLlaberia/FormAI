import { notFound } from 'next/navigation';

import InfoSettings from './(components)/InfoSettings';
import CopyBtn from '../published/(components)/CopyBtn';
import Pagination from './(components)/Pagination';
import SubmissionsTable from './(components)/SubmissionsTable';
import { getFormById } from '@/actions/forms';
import { getSubmissions } from '@/actions/submissions';
import {
  ElementsType,
  FormElementInstance,
} from '../edit/(components)/FormElements';

export type Row = {
  [key: string]: string;
};

export type Column = {
  id: string;
  label: string;
  required: boolean;
  types: ElementsType;
};

const FormInformationPage = async ({
  params,
  searchParams,
}: {
  params: { formId: string };
  searchParams: { page: string; perPage: string };
}) => {
  const page = searchParams.page ?? '1';
  const perPage = searchParams.perPage ?? '5';

  const [form, submissions] = await Promise.all([
    getFormById(params.formId),
    getSubmissions({ formId: params.formId, page, perPage }),
  ]);

  if (!form || !submissions) return notFound();

  const { id, name, description } = form;
  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: Column[] = [];
  formElements.forEach(element => {
    switch (element.type) {
      case 'TextField':
      case 'NumberField':
      case 'CheckboxField':
      case 'DateField':
      case 'TextareaField':
      case 'OptionsField':
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          //@ts-ignore
          type: element.type,
        });
        break;

      default:
        break;
    }
  });

  const rows: Row[] = [];
  submissions.submissions.forEach(submission => {
    const content = JSON.parse(submission.content);
    rows.push(content);
  });

  return (
    <div>
      <div className='flex items-start gap-8 justify-between mb-6'>
        <div className='flex flex-col items-start justify-center'>
          <h1 className='text-lg font-medium tracking-tight'>{name}</h1>
          <p className='line-clamp-2 text-sm text-muted-foreground'>
            {description}
          </p>
        </div>
        <InfoSettings />
      </div>

      <CopyBtn formId={id} />

      <h2 className='text-sm font-medium px-1 mb-2'>Submissions</h2>
      <SubmissionsTable columns={columns} rows={rows} />

      <Pagination count={submissions.count} />
    </div>
  );
};

export default FormInformationPage;
