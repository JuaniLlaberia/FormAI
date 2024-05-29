import { notFound, redirect } from 'next/navigation';

import FormEditor from './(components)/FormEditor';
import { getFormById } from '@/actions/forms';

const FormEditPage = async ({ params }: { params: { formId: string } }) => {
  const form = await getFormById(params.formId);

  if (!form) return notFound();

  if (form.needsConfigure)
    return redirect(`/dashboard/form/${form.id}/${form.configureType}`);
  if (form.isPublished)
    return redirect(`/dashboard/form/${form.id}/information`);

  return <FormEditor form={form} />;
};

export default FormEditPage;
