import { notFound } from 'next/navigation';

import FormSubmit from './(components)/FormSubmit';
import { getFormContent } from '@/actions/forms';
import { FormElementInstance } from '@/app/dashboard/form/[formId]/edit/(components)/FormElements';

const SubmitPage = async ({ params }: { params: { formId: string } }) => {
  const form = await getFormContent({ formId: params.formId });
  if (!form) return notFound();

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return (
    <div className='flex flex-1 px-4 md:px-8 lg:px-16 xl:px-32 py-2'>
      <FormSubmit
        formId={params.formId}
        formContent={formContent}
      />
    </div>
  );
};

export default SubmitPage;
