import Link from 'next/link';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';

import ConfettiComponent from './(components)/ConfettiComponent';
import CopyBtn from './(components)/CopyBtn';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const PublishedPage = ({ params }: { params: { formId: string } }) => {
  return (
    <>
      <ConfettiComponent />
      <div className='flex flex-col flex-1 items-center justify-center'>
        <div className='max-w-[550px]'>
          <h2 className='text-center text-2xl lg:text-4xl font-semibold tracking-tight mb-2 lg:mb-4'>
            Your Form was Published 🎉
          </h2>
          <p className='text-muted-foreground lg:px-2'>
            Your form was published successfully. Now you can share it with the
            public and start receiving submissions.{' '}
            <span className='text-primary'>Share link bellow</span>
          </p>
          <CopyBtn formId={params.formId} />
          <Separator />
          <div className='flex justify-between items-center mt-2'>
            <Link
              href={`/dashboard`}
              className={buttonVariants({ size: 'sm', variant: 'link' })}
            >
              <ArrowLeft className='mr-1.5 size-4' />
              Dashboard
            </Link>
            <Link
              href={`/dashboard/form/${params.formId}/information`}
              className={buttonVariants({ size: 'sm', variant: 'link' })}
            >
              Form details <ArrowRight className='ml-1.5 size-4' />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublishedPage;
