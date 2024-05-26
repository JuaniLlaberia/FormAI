'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components/ui/input';
import { useSetSearchParams } from '@/hooks/useCreateQueryString';

const Searchbar = ({ search = '' }: { search: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const createQueryString = useSetSearchParams();

  const setSearch = useDebouncedCallback(val => {
    router.push(pathname + '?' + createQueryString('search', val));
  }, 1000);

  return (
    <div className='relative w-full'>
      <Search className='absolute top-1/2 -translate-y-1/2 left-3 size-4 text-muted-foreground' />
      <Input
        placeholder='Search forms by name'
        className='pl-8'
        defaultValue={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
