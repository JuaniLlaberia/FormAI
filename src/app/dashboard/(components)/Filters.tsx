'use client';

import { Check, EllipsisVertical } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { useSetSearchParams } from '@/hooks/useCreateQueryString';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Filters = ({
  filter = 'all',
  sortBy = 'activity',
}: {
  filter: 'all' | 'draft' | 'published';
  sortBy: 'activity' | 'name';
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const createQueryString = useSetSearchParams();

  const setSeachParam = (name: string, value: string) => {
    router.push(pathname + '?' + createQueryString(name, value));
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger
          asChild
          className='md:hidden'
        >
          <Button
            size='icon'
            variant='ghost'
            className='px-3 absolute right-0 md:hidden'
          >
            <span className='sr-only'>Filter and sort options</span>
            <EllipsisVertical className='size-4 text-muted-foreground' />
          </Button>
        </DrawerTrigger>
        <DrawerContent className='p-4'>
          <ul>
            <DrawerClose asChild>
              <li
                onClick={() => setSeachParam('filter', 'all')}
                className='py-3 px-2 flex justify-between items-center hover:bg-background-2 rounded-md'
              >
                All forms
                <Check
                  className={cn(
                    'size-4',
                    filter === 'all' ? 'block' : 'hidden'
                  )}
                />
              </li>
            </DrawerClose>
            <DrawerClose asChild>
              <li
                onClick={() => setSeachParam('filter', 'draft')}
                className='py-3 px-2 flex justify-between items-center hover:bg-background-2 rounded-md'
              >
                Draft forms
                <Check
                  className={cn(
                    'size-4',
                    filter === 'draft' ? 'block' : 'hidden'
                  )}
                />
              </li>
            </DrawerClose>
            <DrawerClose asChild>
              <li
                onClick={() => setSeachParam('filter', 'published')}
                className='py-3 px-2 flex justify-between items-center hover:bg-background-2 rounded-md'
              >
                Published forms
                <Check
                  className={cn(
                    'size-4',
                    filter === 'published' ? 'block' : 'hidden'
                  )}
                />
              </li>
            </DrawerClose>
          </ul>
          <Separator />
          <ul>
            <DrawerClose
              asChild
              aria-label='filter button'
            >
              <li
                onClick={() => setSeachParam('sortBy', 'activity')}
                className='py-3 px-2 flex justify-between items-center hover:bg-background-2 rounded-md'
              >
                Sort by activity
                <Check
                  className={cn(
                    'size-4',
                    sortBy === 'activity' ? 'block' : 'hidden'
                  )}
                />
              </li>
            </DrawerClose>
            <DrawerClose
              asChild
              aria-label='filter button'
            >
              <li
                onClick={() => setSeachParam('sortBy', 'name')}
                className='py-3 px-2 flex justify-between items-center hover:bg-background-2 rounded-md'
              >
                Sort by name
                <Check
                  className={cn(
                    'size-4',
                    sortBy === 'name' ? 'block' : 'hidden'
                  )}
                />
              </li>
            </DrawerClose>
          </ul>
        </DrawerContent>
      </Drawer>
      <Select
        value={sortBy}
        onValueChange={val => {
          setSeachParam('sortBy', val);
        }}
      >
        <SelectTrigger className='w-[240px] bg-background-2 hidden md:flex'>
          <SelectValue placeholder='Sort by' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='activity'>Sorty by activity</SelectItem>
          <SelectItem value='name'>Sorty by name</SelectItem>
        </SelectContent>
      </Select>
      <Tabs
        value={filter}
        onValueChange={val => {
          setSeachParam('filter', val);
        }}
        className='hidden md:flex'
      >
        <TabsList>
          <TabsTrigger
            role='tab'
            value='all'
          >
            All
          </TabsTrigger>
          <TabsTrigger
            role='tab'
            value='draft'
          >
            Drafts
          </TabsTrigger>
          <TabsTrigger
            role='tab'
            value='published'
          >
            Published
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

export default Filters;
