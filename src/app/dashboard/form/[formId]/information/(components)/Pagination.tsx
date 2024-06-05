'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useSetSearchParams } from '@/hooks/useCreateQueryString';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Pagination = ({ count }: { count: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useSetSearchParams();

  const page = searchParams.get('page') ?? '1';
  const perPage = searchParams.get('perPage') ?? '5';

  const totalPages = Math.ceil(count / Number(perPage));

  const isLastPage = totalPages === Number(page);

  return (
    <div className='flex flex-col items-start justify-start md:flex-row md:justify-between md:items-center gap-2 px-2 mt-3'>
      <p className='flex gap-2 items-center text-sm text-muted-foreground'>
        Show
        <Select
          value={perPage}
          onValueChange={val => {
            router.push(pathname + '?' + createQueryString('perPage', val));
          }}
        >
          <SelectTrigger className='w-[75px] h-8'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='5'>5</SelectItem>
            <SelectItem value='10'>10</SelectItem>
            <SelectItem value='15'>15</SelectItem>
            <SelectItem value='20'>20</SelectItem>
          </SelectContent>
        </Select>
        per page
      </p>

      <div className='flex justify-between w-full md:w-auto md:justify-center md:gap-2 items-center gap-2'>
        <Button
          size='sm'
          variant='outline'
          disabled={page === '1'}
          onClick={() => {
            router.push(
              pathname + '?' + createQueryString('page', `${Number(page) - 1}`)
            );
          }}
        >
          <ChevronLeft className='size-4 mr-1.5' />
          Previous
        </Button>
        <Button
          size='sm'
          variant='outline'
          disabled={isLastPage}
          onClick={() => {
            router.push(
              pathname + '?' + createQueryString('page', `${Number(page) + 1}`)
            );
          }}
        >
          Next
          <ChevronRight className='size-4 ml-1.5' />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
