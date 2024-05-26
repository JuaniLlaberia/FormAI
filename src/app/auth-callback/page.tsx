'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { getAuth } from './actions';
import { Loader } from 'lucide-react';

const AuthPage = () => {
  const router = useRouter();
  const { data: user } = useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => getAuth(),
    retry: true,
    retryDelay: 500,
  });

  if (user) {
    router.push('/dashboard');
  } else {
    router.push('/');
  }

  return (
    <div className='flex flex-col flex-1 items-center justify-center'>
      <Loader className='size-6 animate-spin mb-2' />
      <h1 className='font-medium'>Logging in</h1>
      <p className='text-sm text-muted-foreground'>
        You will be redirected automatically.
      </p>
    </div>
  );
};

export default AuthPage;
