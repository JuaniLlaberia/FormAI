'use client';

import React from 'react';
import { Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const CopyBtn = ({ formId }: { formId: string }) => {
  const { toast } = useToast();

  const copyLink = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/submit/${formId}`);
    toast({
      title: 'Form link copied',
      description: 'Now you can start sharing this with all your users.',
    });
  };

  return (
    <div className='flex items-center gap-3 w-full my-6 lg:mt-9'>
      <Input
        readOnly
        type='text'
        value={`${process.env.NEXT_PUBLIC_URL}/submit/${formId}`}
      />
      <Button
        onClick={() => copyLink()}
        size='icon'
        className='px-3 md:hidden'
      >
        <Copy className='size-4' />
      </Button>
      <Button
        onClick={() => copyLink()}
        className='hidden md:flex'
        size='sm'
      >
        <Copy className='size-4 mr-1.5' />
        Copy link
      </Button>
    </div>
  );
};

export default CopyBtn;
