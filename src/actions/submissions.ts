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

export const getSubmissions = async ({
  formId,
  page,
  perPage,
}: {
  formId: string;
  page: string;
  perPage: string;
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect('/');

  const form = await db.form.findUnique({ where: { id: formId } });
  if (form?.createdBy !== user.id)
    throw new Error('You cannot access this data.');

  const skip = (Number(page) - 1) * Number(perPage);

  const submission = await db.submission.findMany({
    where: { formId: form.id },
    skip,
    take: Number(perPage),
  });

  const totalSubmissionsCount = await db.submission.count({
    where: { formId: form.id },
  });

  return {
    submissions: submission,
    count: totalSubmissionsCount,
  };
};
