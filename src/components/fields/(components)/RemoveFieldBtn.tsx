'use client';

import { Trash } from 'lucide-react';

import { useFormContext } from '@/app/dashboard/form/[formId]/edit/(components)/FormContext';
import { Button } from '@/components/ui/button';

const RemoveFieldBtn = ({ elementId }: { elementId: string }) => {
  const { removeElement } = useFormContext();

  return (
    <div className='mt-3.5'>
      <Button
        onClick={() => removeElement(elementId)}
        size='sm'
        variant='destructive'
        className='w-full'
      >
        <Trash className='size-4 mr-1.5' />
        Remove
      </Button>
    </div>
  );
};

export default RemoveFieldBtn;
