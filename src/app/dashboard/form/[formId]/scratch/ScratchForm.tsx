'use client';

import { Loader, Sparkles } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { generateFormWithAi } from '@/actions/forms';
import { useToast } from '@/components/ui/use-toast';

const ScratchForm = ({ formId }: { formId: string }) => {
  const [prompt, setPrompt] = useState<string>('');
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: generateForm, isPending } = useMutation({
    mutationKey: ['generate-form'],
    mutationFn: generateFormWithAi,
    onSuccess: () => {
      router.push(`/dashboard/form/${formId}/edit`);
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: `Failed to generate form using AI. Please try again.`,
        variant: 'destructive',
      });
    },
  });

  return (
    <div className='flex flex-col w-full max-w-[500px]'>
      <div className='mb-8'>
        <h1 className='text-center text-2xl lg:text-3xl font-medium mb-2 tracking-tight'>
          Generate Your Form
        </h1>
        <p className='text-sm text-muted-foreground tracking-tight'>
          Create an unique prompt so that{' '}
          <span className='font-medium text-primary'>Gemini</span> can help you
          generate the best form for your needs. You can skip if you dont want
          AI.
        </p>
      </div>
      <div className='flex items-center mb-1 gap-2'>
        <Label>Your prompt</Label>
        <span className='text-sm text-muted-foreground'>
          ({prompt.length}/400 characters)
        </span>
      </div>
      <Textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        maxLength={400}
        className='h-[200px] resize-none'
        placeholder='e.g. A form to track students attendance to class. Include email and full name fields...'
      />
      <div className='flex  gap-2 w-full justify-end mt-3'>
        <Button size='sm' variant='ghost' disabled={isPending}>
          Skip
        </Button>
        <Button
          onClick={() => generateForm({ prompt, formId })}
          size='sm'
          disabled={isPending}
        >
          {isPending ? <Loader className='size-4 mr-1.5 animate-spin' /> : null}
          Generate with Ai
          <Sparkles className='size-3.5 ml-1.5 fill-primary' />
        </Button>
      </div>
    </div>
  );
};

export default ScratchForm;
