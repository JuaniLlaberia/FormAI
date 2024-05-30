'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { ConfigureType, Form } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { model } from '@/gemini';

type PartialForm = Partial<Form>;

export const getForms = async ({
  search,
  filter,
  sort,
}: {
  search: string;
  filter: 'all' | 'draft' | 'published';
  sort: 'activity' | 'name';
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect('/');

  const forms = await db.form.findMany({
    where: {
      createdBy: user.id,
      name: { contains: search, mode: 'insensitive' },
      isPublished:
        filter === 'draft' ? false : filter === 'published' ? true : undefined,
    },
    orderBy: sort === 'activity' ? { updatedAt: 'desc' } : { name: 'desc' },
    select: {
      id: true,
      name: true,
      description: true,
      isPublished: true,
      updatedAt: true,
    },
  });

  return forms;
};

export const getFormById = async (formId: string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect('/');

  return await db.form.findUnique({ where: { id: formId } });
};

export const createForm = async ({
  name,
  description,
  configType,
}: {
  name: string;
  description: string;
  configType: ConfigureType;
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect('/');

  const form = await db.form.create({
    data: { name, description, createdBy: user.id, configureType: configType },
  });

  revalidatePath('/dashboard');
  return form.id;
};

export const updateForm = async ({
  formId,
  formData,
}: {
  formId: string;
  formData: PartialForm;
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect('/');

  await db.form.update({ where: { id: formId }, data: formData });
  revalidatePath('/dashboard/form/[formId]/edit');
};

export const generateFormWithAi = async ({
  prompt,
  formId,
}: {
  prompt: string;
  formId: string;
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect('/');

  //Generate field JSON using Gemini API
  const fullPromp = `Create inputs for a form, description: ${prompt}, On the basis of description please give form in json format with form fields (including label, placeholder, helperText (extra indications for that inpu), required set to false and also include the type of the input. Being, text: TextField, options: OptionsField, etc... And the format should be like this: {id, type, extraAttributes: {label, placeholder, required, helperText}}}). In Json format, nothing else.`;

  const result = await model.generateContent(fullPromp);
  const response = await result.response;
  const json = response.text();

  //Store generated content in DB
  await db.form.update({
    where: { id: formId },
    data: { content: json, needsConfigure: false, updatedAt: new Date() },
  });
};

export const deleteForm = async ({ formId }: { formId: string }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect('/');

  const form = await db.form.findUnique({ where: { id: formId } });
  if (form?.createdBy !== user.id) return redirect('/');

  await db.form.delete({ where: { id: formId } });

  revalidatePath('/dashboard');
};
