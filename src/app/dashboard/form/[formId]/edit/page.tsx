import { redirect } from 'next/navigation';
import { getFormById } from '@/actions/forms';

const FormEditPage = async ({ params }: { params: { formId: string } }) => {
  const form = await getFormById(params.formId);

  if (form?.needsConfigure)
    return redirect(`/dashboard/form/${form.id}/${form.configureType}`);

  console.log(form);

  return <div></div>;
};

export default FormEditPage;
