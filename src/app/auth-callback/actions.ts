'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { db } from '@/db';

export const getAuth = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) throw new Error('Failed to authenticate');

  const userDB = await db.user.findUnique({ where: { id: user.id } });

  if (!userDB) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email,
        fullName: user.given_name ?? '',
        profileImage: user.picture ?? '',
      },
    });
  }

  return true;
};
