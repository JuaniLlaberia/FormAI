'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

import { db } from '@/db';

export const submitForm = async ({
  formId,
  submittedContent,
}: {
  formId: string;
  submittedContent: string;
}) => {
  await db.submission.create({
    data: {
      formId,
      content: submittedContent,
    },
  });
};

export const getSubmissions = async ({ formId }: { formId: string }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect('/');

  const form = await db.form.findUnique({ where: { id: formId } });
  if (form?.createdBy !== user.id)
    throw new Error('You cannot access this data.');

  const submission = db.submission.findMany({ where: { formId: form.id } });
  return submission;
};
